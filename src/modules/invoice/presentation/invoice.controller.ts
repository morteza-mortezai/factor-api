import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AddInvoiceItemDto, CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AddInvoiceItemUseCase } from '../application/use-cases/add-invoice-item.use-case';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly addInvoiceItemUseCase: AddInvoiceItemUseCase) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Post(':id/item')
  adddInvoiceItem(
    @Param('id') invoiceId: string,
    @Body() dto: AddInvoiceItemDto,
  ) {
    return this.addInvoiceItemUseCase.execute({ invoiceId, ...dto });
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
