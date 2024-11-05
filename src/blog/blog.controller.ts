import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from '../dtos/create-blog.dto';
import { UpdateBlogDto } from '../dtos/update-blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    return this.blogService.createBlog(createBlogDto, req.user.userId);
  }

  @Get()
  async getAllBlogs() {
    return this.blogService.findAllBlogs();
  }

  @Get(':id')
  async getBlogById(@Param('id') id: number) {
    return this.blogService.findBlogById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBlog(
    @Param('id') id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @Req() req,
  ) {
    return this.blogService.updateBlog(id, updateBlogDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBlog(@Param('id') id: number, @Req() req) {
    return this.blogService.deleteBlog(id, req.user.userId);
  }
}
