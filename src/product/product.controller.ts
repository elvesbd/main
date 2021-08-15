import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async allProducts() {
    return this.productService.all();
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
