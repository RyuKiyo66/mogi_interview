'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { generateCSV, downloadCSV } from '@/lib/csv-export'
import type { Interview } from '@/lib/types'

interface CSVExportButtonProps {
  interviews: Interview[]
  disabled?: boolean
}

export function CSVExportButton({
  interviews,
  disabled = false,
}: CSVExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    try {
      setIsExporting(true)
      console.log('[v0] Exporting', interviews.length, 'interviews to CSV')

      // CSV を生成
      const csv = generateCSV(interviews)

      // ファイル名を日付付きで生成
      const now = new Date()
      const dateStr = now.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
      const filename = `取材記録_${dateStr}.csv`

      // ダウンロード
      downloadCSV(csv, filename)
      console.log('[v0] CSV exported successfully:', filename)
    } catch (error) {
      console.error('[v0] Error exporting CSV:', error)
      alert('CSV エクスポートに失敗しました')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isExporting || interviews.length === 0}
      variant="outline"
      className="whitespace-nowrap"
    >
      {isExporting ? 'エクスポート中...' : 'CSV ダウンロード'}
    </Button>
  )
}
