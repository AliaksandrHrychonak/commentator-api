import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { Types } from 'mongoose';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';

export function PaginationFilterNinObjectIdPipe(
    field: string,
    raw: boolean
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterNinObjectIdPipe implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly paginationService: PaginationService
        ) {}

        async transform(
            value: string
        ): Promise<Record<string, { $nin: (Types.ObjectId | string)[] } | string>> {
            if (!value) {
                return undefined;
            }
            value = value.trim();
            const finalValue =
                value
                    .split(',')
                    .map((value: string) => Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value)

            if (raw) {
                return {
                    [field]: value,
                };
            }

            return this.paginationService.filterNin<Types.ObjectId | string>(
                field,
                finalValue
            );
        }
    }

    return mixin(MixinPaginationFilterNinObjectIdPipe);
}
