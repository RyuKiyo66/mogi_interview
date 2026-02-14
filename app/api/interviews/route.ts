import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'
import type { Interview } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    const searchParams = request.nextUrl.searchParams
    const keyword = searchParams.get('keyword')

    let query = supabase
      .from('interviews')
      .select('*')
      .order('interview_date', { ascending: false })

    // If keyword is provided, search in interviewee_name and content
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase()
      const { data, error } = await query

      if (error) throw error

      // Client-side filtering for Japanese text search
      const filtered = data.filter((interview: Interview) =>
        interview.interviewee_name.toLowerCase().includes(lowerKeyword) ||
        interview.content.toLowerCase().includes(lowerKeyword) ||
        interview.summary?.toLowerCase().includes(lowerKeyword)
      )

      return NextResponse.json(filtered)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching interviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()
    const { interviewee_name, interview_date, content, summary } = body

    if (!interviewee_name || !interview_date || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('interviews')
      .insert([
        {
          interviewee_name,
          interview_date,
          content,
          summary: summary || content.substring(0, 100),
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Error creating interview:', error)
    return NextResponse.json(
      { error: 'Failed to create interview' },
      { status: 500 }
    )
  }
}
