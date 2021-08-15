import { HttpService } from '@nestjs/axios';
import { Get, Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async allProducts() {
    return this.productService.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findOne(id);

    this.httpService
      .post(`http://localhost:8000/api/products/${id}/like`, {})
      .subscribe((res) => {
        console.log(res);
      });

    return this.productService.update(id, { likes: product.likes + 1 });
  }

  @EventPattern('product_created')
  async productCreated(product: any) {
    await this.productService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product-updated')
  async productUpdated(product: any) {
    await this.productService.update(product.id, {
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product-deleted')
  async productDeleted(id: number) {
    await this.productService.delete(id);
  }
}
