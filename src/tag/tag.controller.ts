import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  // Route to create a new tag (protected)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }

  // Route to get all tags
  @Get()
  async getAllTags() {
    return this.tagService.findAllTags();
  }
}
