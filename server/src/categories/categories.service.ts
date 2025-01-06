import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriesArrayDto, CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category.response.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  create(createCategoryDto: CreateCategoriesArrayDto, userId: number) {
    return Promise.all(
      createCategoryDto.categories.map(async (category) => {
        const foundedCategory = await this.prisma.category.findUnique({
          where: {
            name_userId: {
              name: category.name,
              userId,
            },
          },
        });
        if (!!foundedCategory) {
          return await this.prisma.category.update({
            where: {
              name_userId: {
                name: category.name,
                userId: userId,
              },
            },
            data: { isActive: true },
          });
        } else {
          return await this.prisma.category.create({
            data: {
              ...category,
              userId: userId,
            },
          });
        }
      }),
    );
  }

  findAll(userId: number) {
    return this.prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number, userId: number) {
    try {
      return this.prisma.category.findFirstOrThrow({
        where: {
          id,
          userId,
          isActive: true
        }
      })
    } catch (err) {
      throw new NotFoundException('Category not found');
    }
  }

  async update(updateCategoriesDto: UpdateCategoryDto[], userId: number) {
    const res: CategoryResponseDto[] = [];
    for (const newCategory of updateCategoriesDto) {
      try {
        const updateRes = await this.prisma.category.update({
          where: { id: newCategory.id, userId },
          data: { name: newCategory.name },
        });
        res.push(updateRes);
      } catch (e) {
        throw new NotFoundException('Category not found');
      }
    }
    return res;
  }

  async remove(id: number, userId: number) {
    try {
      return this.prisma.category.update({
        where: { id, userId },
        data: { isActive: false },
      });
    } catch (err) {
      throw new NotFoundException('Category not found');
    }
  }
}
