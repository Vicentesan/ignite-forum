import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswerRepository } from '../repositories/answer-repository'

interface CommentOnAnswerUseCaseProps {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  success: boolean
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswerRepository,
    private answersCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseProps): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = this.answersRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found')

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answersCommentsRepository.create(answerComment)

    return { success: true, answerComment }
  }
}
