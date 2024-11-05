import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from '../models/tag.model';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag) private tagModel: typeof Tag) {}

  // Create a new tag
  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name } = createTagDto;

    // Check if the tag already exists
    const existingTag = await this.tagModel.findOne({ where: { name } });
    if (existingTag) {
      return existingTag;
    }

    // Create a new tag if it does not exist
    const tag = await this.tagModel.create({ name });
    return tag;
  }

  // Method to get all tags
  async findAllTags(): Promise<Tag[]> {
    return this.tagModel.findAll();
  }

  // Method to get a specific tag by its name
  async findTagByName(name: string): Promise<Tag> {
    return this.tagModel.findOne({ where: { name } });
  }
}
