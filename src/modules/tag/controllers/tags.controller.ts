import {
    BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Post,
  Query,
} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Types } from 'mongoose';
import { User } from 'src/common/auth/decorators/auth.decorator';
import { AuthJwtGuard } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';

import {
  Response,
  ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { IResponse, IResponsePaging } from 'src/common/response/response.interface';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { IUserDocument } from 'src/modules/user/user.interface';
import { ENUM_TAG_STATUS_CODE_ERROR } from '../constants/tag.status-code.constant';
import { GetTag, TagDeleteGuard } from '../decorators/tag.decorator';
import { TagListDto } from '../dtos/tag.list.dto';
import { TagRequestDto } from '../dtos/tag.request.dto';
import { TagDocument } from '../schemas/tag.schema';
import { TagListSerialization } from '../serializations/tag.list.serialization';
import { TagService } from '../services/tag.service';
import { ITagDocument } from '../tag.interface';


@Controller({
    version: '1',
    path: '/tag',
})
export class TagController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly tagService: TagService
    ) {}
  
  @ResponsePaging('tag.list', {
      classSerialization: TagListSerialization,
  })
  @AuthJwtGuard()
  @Get('/list')
  async list(
      @Query()
      {
          page,
          perPage,
          sort,
          search,
          availableSort,
          availableSearch,
      }: TagListDto,
      @User() user: IUserDocument
  ): Promise<IResponsePaging> {
    
      const skip: number = await this.paginationService.skip(page, perPage);
      const find: Record<string, any> = {
            owner: new Types.ObjectId(user._id),
          ...search,
      };

      const tags: TagDocument[] = await this.tagService.findAll(find, {
          skip: skip,
          limit: perPage,
          sort,
      });

      const totalData: number = await this.tagService.getTotal({});
      const totalPage: number = await this.paginationService.totalPage(
          totalData,
          perPage
      );

      return {
          totalData,
          totalPage,
          currentPage: page,
          perPage,
          availableSearch,
          availableSort,
          data: tags,
      };
  }

    @Response('tag.listAll')
    @AuthJwtGuard()
    @Get('/list/all')
    async listAll(
        @User() user: IUserDocument
    ): Promise<{ data: TagDocument[] }> {

        const find: Record<string, any> = {
            owner: new Types.ObjectId(user._id),
        };

        const tags: TagDocument[] = await this.tagService.findAll(find);

        return {
            data: tags,
        };
    }


    @Response('tag.create')
    @AuthJwtGuard()
    @Post('/create')
    async create(
        @Body()
        { name },
        @User() user: IUserDocument
    ): Promise<IResponse> {

        const exist: boolean = await this.tagService.exists(name, user._id);
        if (exist) {
            throw new BadRequestException({
                statusCode: ENUM_TAG_STATUS_CODE_ERROR.TAG_EXISTS_ERROR,
                message: 'tag.error.exist',
            });
        }

        try {
            const create = await this.tagService.create({
                name,
                owner: user._id,
            });

            return {
                create
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }

    @Response('tag.delete')
    @TagDeleteGuard()
    @RequestParamGuard(TagRequestDto)
    @AuthJwtGuard()
    @Delete('/delete/:tag')
    async delete(
        @GetTag() tag: ITagDocument,
        @User() user: IUserDocument
    ): Promise<void> {
        if(tag.owner.toString() !== user._id) {
            throw new ForbiddenException({
                statusCode: ENUM_TAG_STATUS_CODE_ERROR.TAG_ACCESS_ERROR,
                message: 'tag.error.access',
            });
        }
        try {
            await this.tagService.deleteOneById(tag._id);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return;
    }
}
