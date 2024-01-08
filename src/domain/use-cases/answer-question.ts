import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Answer } from '../entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface AnswerQuestionUseCaseProps {
  instructorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseProps) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
