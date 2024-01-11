import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryRepositoryModule } from './repository/category.repository.module';

@Module({
    imports: [CategoryRepositoryModule],
    exports: [CategoryService],
    providers: [CategoryService],
    controllers: [],
})
export class CategoryModule {}
