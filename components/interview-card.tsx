'use client'

import { useState } from 'react'
import type { Interview } from '@/lib/types'

interface InterviewCardProps {
  interview: Interview
  onClick: (interview: Interview) => void
  onDelete?: (id: string) => Promise<void>
}

export function InterviewCard({ interview, onClick, onDelete }: InterviewCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('[v0] Delete button clicked for interview:', interview.id)
    alert(`削除ボタンが押されました。ID: ${interview.id}`)
    if (!onDelete) {
      console.log('[v0] onDelete callback not provided')
      return
    }
    
    if (confirm('この取材記録を削除してもよろしいですか？')) {
      setIsDeleting(true)
      console.log('[v0] Delete confirmed, calling onDelete')
      try {
        await onDelete(interview.id)
        console.log('[v0] Delete completed successfully')
      } catch (error) {
        console.error('[v0] Error deleting interview:', error)
        alert('削除に失敗しました')
      } finally {
        setIsDeleting(false)
      }
    } else {
      console.log('[v0] Delete cancelled by user')
    }
  }

  return (
    <div
      onClick={() => onClick(interview)}
      className="p-4 sm:p-6 border border-white/40 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-xl hover:border-primary transition-all cursor-pointer group relative"
    >
      <div className="space-y-2">
        {/* Date */}
        <p className="text-xs text-muted-foreground">
          {formatDate(interview.interview_date)}
        </p>

        {/* Interviewee Name */}
        <h3 className="text-base sm:text-lg font-semibold text-foreground line-clamp-1">
          {interview.interviewee_name}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
          {interview.summary}
        </p>
      </div>

      {/* Delete button */}
      {onDelete && (
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          type="button"
          className="mt-3 px-3 py-1 text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white rounded font-semibold transition-colors"
        >
          削除
        </button>
      )}

      {/* Click to read more indicator */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
        <p className="text-xs text-primary font-semibold group-hover:translate-x-1 transition-transform">→ クリックして詳細を表示</p>
      </div>
    </div>
  )
}
