import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseProps {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {
  success: boolean
  answerCommentId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseProps): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) throw new Error('Answer comment not found')

    if (authorId !== answerComment.authorId.toString())
      throw new Error('Not allowed')

    await this.answerCommentsRepository.delete(answerComment)

    return { success: true, answerCommentId: answerComment.id.toString() }
  }
}
