import type { Renderers } from './Common'

import type { CC } from './CustomComponent'

import type { Guards } from '~guards'
import type { Layouts } from '~utils/layouts'

export interface PageAppendType {
  guards?: Guards[]
  layout?: Layouts
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Page<T = any, U = any> = CC<T> & PageAppendType & Renderers<U>
