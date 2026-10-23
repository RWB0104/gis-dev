/**
 * OAS 셋업 모듈
 *
 * @author RWB
 * @since 2026.10.16 금 16:17:21
 */

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);
