import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from '../models/blog.model';
import { User } from '../models/user.model';
import { Tag } from '../models/tag.model';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog) private blogModel: typeof Blog,
    @InjectModel(Tag) private tagModel: typeof Tag,
  ) {}

  // Find or create the new tags
  async FindOrCreateTag(tags: string[]) {
    const tagInstances = await Promise.all(
      tags.map(async (tagName) => {
        const [tag] = await this.tagModel.findOrCreate({
          where: { name: tagName },
          defaults: { name: tagName },
        });
        return tag;
      }),
    );
    return tagInstances;
  }

  async createBlog(
    createBlogDto: CreateBlogDto,
    userId: number,
  ): Promise<Blog> {
    const { title, content, tags } = createBlogDto;

    // Create the Blog entry
    const blog = await this.blogModel.create({ title, content, userId });

    // Handle the tags association
    if (tags && tags.length > 0) {
      const tagInstances = await this.FindOrCreateTag(tags);

      // Associate the tags with the blog
      await blog.$set('tags', tagInstances);
    }

    return blog;
  }

  async findAllBlogs(): Promise<Blog[]> {
    return this.blogModel.findAll({ include: [User] });
  }

  async findBlogById(id: number): Promise<Blog> {
    const blog = await this.blogModel.findByPk(id, { include: [User] });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async updateBlog(
    id: number,
    updateBlogDto: UpdateBlogDto,
    userId: number,
  ): Promise<Blog> {
    const blog = await this.findBlogById(id);

    // Check if the user is authorized to update the blog
    if (blog.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this blog',
      );
    }

    // Update the blog content
    await blog.update(updateBlogDto);

    // Handle tags update logic
    if (updateBlogDto.tags) {
      const tags = updateBlogDto.tags;

      // Find or create the new tags
      const tagInstances = await this.FindOrCreateTag(tags);

      //  Update the blog's associated tags
      await blog.$set('tags', tagInstances);
    }

    return blog;
  }

  async deleteBlog(id: number, userId: number): Promise<void> {
    const blog = await this.findBlogById(id);
    if (blog.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this blog',
      );
    }
    await blog.destroy();
  }
}
