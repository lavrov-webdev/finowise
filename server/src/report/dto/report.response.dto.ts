import { ApiProperty } from "@nestjs/swagger";
import { SprintReportResponseDto } from "src/sprints/dto/sprint.response.dto";
import { CategoryReportResponseDto } from "src/categories/dto/category.response.dto";
import { IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";


class SprintsWrapper {
    @ApiProperty({ type: [SprintReportResponseDto] })
    items: SprintReportResponseDto[];
}

class CategoriesWrapper {
    @ApiProperty({ type: [CategoryReportResponseDto] })
    items: CategoryReportResponseDto[];
}

export class ReportResponseDto {
    @ApiProperty({ 
        type: SprintsWrapper,
        example: {
            items: [
                {
                    id: 1,
                    totalSpend: 1000,
                    startDate: new Date(),
                    endDate: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 1,
                    startSum: 1000
                }
            ]
        }
    })
    sprints: {
        items: SprintReportResponseDto[]
    }

    @ApiProperty({ 
        type: CategoriesWrapper,
        example: {
            items: [
                {
                    id: 1,
                    userId: 1,
                    name: 'Food',
                    totalSpend: 1000,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                }
            ]
        }
    })
    categories: {
        items: CategoryReportResponseDto[]
    }

    @ApiProperty()
    totalSpend: number;

}

export class ReportFilterDto {
    @ApiProperty({ example: 1, required: false, description: 'Filter by sprint ID' })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    sprintId?: number;  

    @ApiProperty({ example: 1, required: false, description: 'Filter by category ID' })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    categoryId?: number;
}