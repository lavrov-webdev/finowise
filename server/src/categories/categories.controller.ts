import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces';
import { CategoriesService } from './categories.service';
import { CategoryResponseDto } from './dto/category.response.dto';
import { CreateCategoriesArrayDto } from './dto/create-category.dto';
import { UpdateCategoriesArrayDto } from './dto/update-category.dto';

@ApiTags('categories')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Auth is needed' })
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ApiCreatedResponse({ type: [CategoryResponseDto] })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(
    @Body() createCategoriesDto: CreateCategoriesArrayDto,
    @Request() req: RequestWithUser,
  ): Promise<CategoryResponseDto[]> {
    return this.categoriesService.create(createCategoriesDto, req.user.id);
  }

  @Get()
  @ApiOkResponse({ type: [CategoryResponseDto] })
  findAll(@Request() req: RequestWithUser): Promise<CategoryResponseDto[]> {
    return this.categoriesService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoryResponseDto })
  @ApiNotFoundResponse({ description: 'Category not found' })
  findOne(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.findOne(+id, req.user.id);
  }

  @Patch()
  @ApiOkResponse({ type: [CategoryResponseDto] })
  @ApiNotFoundResponse({ description: 'Category not found' })
  update(
    @Body() updateCategoryDto: UpdateCategoriesArrayDto,
    @Request() req: RequestWithUser,
  ): Promise<CategoryResponseDto[]> {
    return this.categoriesService.update(updateCategoryDto.categories, req.user.id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CategoryResponseDto })
  @ApiNotFoundResponse({ description: 'Category not found' })
  remove(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.remove(+id, req.user.id);
  }
}
