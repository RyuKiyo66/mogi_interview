import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching interview:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interview' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const supabase = getSupabaseClient()
    const body = await request.json()
    const { interviewee_name, interview_date, content, summary } = body

    const { data, error } = await supabase
      .from('interviews')
      .update({
        interviewee_name,
        interview_date,
        content,
        summary: summary || content.substring(0, 100),
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()

    if (error) throw error

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error updating interview:', error)
    return NextResponse.json(
      { error: 'Failed to update interview' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[v0] DELETE request received for ID:', params.id)
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('[v0] Database not configured')
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const supabase = getSupabaseClient()
    console.log('[v0] Deleting interview with ID:', params.id)
    
    // Execute SQL delete query directly
    const { data, error } = await supabase
      .from('interviews')
      .delete()
      .eq('id', params.id)
      .select()

    console.log('[v0] Delete response - data:', data, 'error:', error)

    if (error) {
      console.log('[v0] Supabase delete error:', error)
      throw new Error(String(error))
    }

    console.log('[v0] Interview deleted successfully:', params.id)
    return NextResponse.json({ success: true, deletedId: params.id })
  } catch (error) {
    console.error('[v0] Error deleting interview:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete interview'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
