import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'
import type { Interview } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    // Check for required environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Database not configured. Please set Supabase environment variables.' },
        { status: 503 }
      )
    }

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

      if (error) {
        console.error('[v0] Supabase query error:', error)
        throw error
      }

      // Client-side filtering for Japanese text search
      const filtered = data.filter((interview: Interview) =>
        interview.interviewee_name.toLowerCase().includes(lowerKeyword) ||
        interview.content.toLowerCase().includes(lowerKeyword) ||
        interview.summary?.toLowerCase().includes(lowerKeyword)
      )

      console.log('[v0] Filtered interviews by keyword:', filtered.length)
      return NextResponse.json(filtered)
    }

    const { data, error } = await query

    if (error) {
      console.error('[v0] Supabase query error:', error)
      throw error
    }

    console.log('[v0] Fetched interviews:', data.length)
    return NextResponse.json(data)
  } catch (error) {
    console.error('[v0] Error fetching interviews:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch interviews'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check for required environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Database not configured. Please set Supabase environment variables.' },
        { status: 503 }
      )
    }

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

    if (error) {
      console.error('[v0] Supabase insert error:', error)
      throw error
    }

    console.log('[v0] Interview created:', data[0])
    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating interview:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create interview'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
