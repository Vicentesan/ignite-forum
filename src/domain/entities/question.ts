import { Entity } from '../../core/entities/entity'
import { Slug } from './value-object/slug'

interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: string
}

export class Question extends Entity<QuestionProps> {}
