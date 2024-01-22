import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/question-repository'

interface CommentOnQuestionUseCaseProps {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  success: boolean
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseProps): Promise<CommentOnQuestionUseCaseResponse> {
    const question = this.questionsRepository.findById(questionId)

    if (!question) throw new Error('Question not found')

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionsCommentsRepository.create(questionComment)

    return { success: true, questionComment }
  }
}
