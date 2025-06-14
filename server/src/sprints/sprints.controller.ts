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
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces';
import { CreateSprintDto } from './dto/create-sprint.dto';
import {
  SprintDetailedResponseDto,
  SprintIdDto,
  SprintResponseDto,
} from './dto/sprint.response.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { SprintsService } from './sprints.service';

@ApiTags('sprints')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Auth is needed' })
@Controller('sprints')
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) { }

  @Post()
  @ApiCreatedResponse({ type: SprintResponseDto })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(
    @Body() createSprintDto: CreateSprintDto,
    @Request() req: RequestWithUser,
  ): Promise<SprintResponseDto> {
    return this.sprintsService.create(createSprintDto, req.user.id);
  }

  @Get()
  @ApiOkResponse({ type: [SprintResponseDto] })
  findAll(
    @Request() req: RequestWithUser,
  ): Promise<SprintResponseDto[]> {
    return this.sprintsService.findAll(req.user.id);
  }

  @Get('current')
  @ApiOkResponse({
    type: SprintIdDto,
  })
  @ApiNotFoundResponse({ description: 'Sprint not found' })
  findCurrent(
    @Request() req: RequestWithUser,
  ): Promise<SprintIdDto> {
    return this.sprintsService.findCurrent(req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({
    type: SprintDetailedResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Sprint not found' })
  findOne(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<SprintDetailedResponseDto> {
    return this.sprintsService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SprintResponseDto })
  @ApiNotFoundResponse({ description: 'Sprint not found' })
  update(
    @Param('id') id: string,
    @Body() updateSprintDto: UpdateSprintDto,
    @Request() req: RequestWithUser,
  ): Promise<SprintResponseDto> {
    return this.sprintsService.update(+id, updateSprintDto, req.user.id);
  }

  @Delete(':id')
  @ApiOkResponse({ 
    type: SprintResponseDto,
    description: 'Sprint and all its related envelopes and transactions have been successfully deleted'
  })
  @ApiNotFoundResponse({ 
    description: 'Sprint not found or user does not have access to it'
  })
  remove(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<SprintResponseDto> {
    return this.sprintsService.remove(+id, req.user.id);
  }
}
