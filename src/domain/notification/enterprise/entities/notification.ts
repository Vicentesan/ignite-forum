/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface NotifactionProps {
  recipientId: UniqueEntityId
  title: string
  content: string
  readAt?: Date
  createdAt: Date
}

export class Notification extends Entity<NotifactionProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get readAt() {
    return this.props.readAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  // set recipientId(recipientId: UniqueEntityId) {
  //   this.props.recipientId = recipientId
  // }

  // set title(title: string) {
  //   this.props.title = title
  // }

  // set content(content: string) {
  //   this.props.content = content
  // }

  // set readAt(readAt: Date | undefined) {
  //   this.props.readAt = readAt
  // }

  static create(
    props: Optional<NotifactionProps, 'createdAt' | 'readAt'>,
    id?: UniqueEntityId,
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        readAt: props.readAt ?? undefined,
      },
      id,
    )

    return notification
  }
}
