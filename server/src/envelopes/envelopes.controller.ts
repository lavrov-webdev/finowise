import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Request
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces';
import { DateTransformer } from 'src/transformers/date.transformer';
import { EnvelopeDetailedResponseDto, EnvelopeResponseDto } from './dto/envelope.response.dto';
import { UpdateEnvelopeDto } from './dto/update-envelope.dto';
import { EnvelopesService } from './envelopes.service';

@ApiTags('envelopes')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Auth is needed' })
@Controller('envelopes')
export class EnvelopesController {
  constructor(private readonly envelopesService: EnvelopesService) { }

  @Patch(':id')
  @ApiOkResponse({ type: EnvelopeResponseDto })
  @ApiNotFoundResponse({ description: 'Envelope not found' })
  update(
    @Param('id') id: string,
    @Body() updateEnvelopeDto: UpdateEnvelopeDto,
    @Request() req: RequestWithUser,
  ): Promise<EnvelopeResponseDto> {
    return this.envelopesService.update(+id, updateEnvelopeDto, req.user.id);
  }

  @ApiParam({ name: 'date', example: '2023-06-23', type: String })
  @Get('by_date/:date')
  @ApiOkResponse({ type: [EnvelopeDetailedResponseDto] })
  getByDate(
    @Param('date', DateTransformer)
    date: string,
    @Request() req: RequestWithUser,
  ): Promise<EnvelopeDetailedResponseDto[]> {
    return this.envelopesService.getAllByDate(date, req.user.id);
  }
}
