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
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
          aria-label="Delete interview"
          title="削除"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}

      {/* Click to read more indicator */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
        <p className="text-xs text-primary font-semibold group-hover:translate-x-1 transition-transform">→ クリックして詳細を表示</p>
      </div>
    </div>
  )
}
