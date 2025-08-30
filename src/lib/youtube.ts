interface YouTubeChannelStats {
  subscriberCount: number
  viewCount: number
  videoCount: number
  channelId: string
  channelTitle: string
}

interface YouTubeVideoStats {
  viewCount: number
  likeCount: number
  commentCount: number
  videoId: string
  videoTitle: string
}

export class YouTubeAPI {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || ''
    if (!this.apiKey) {
      console.warn('YouTube API key not found. YouTube features will be disabled.')
    }
  }

  /**
   * Extrait l'ID de chaîne YouTube à partir d'une URL
   */
  extractChannelId(url: string): string | null {
    if (!url) return null

    // Patterns pour différents formats d'URL YouTube
    const patterns = [
      /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/user\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/@([a-zA-Z0-9_-]+)/,
      /youtube\.com\/watch\?v=[^&]+&list=([a-zA-Z0-9_-]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return match[1]
      }
    }

    return null
  }

  /**
   * Extrait le handle YouTube à partir d'une URL
   */
  extractHandle(url: string): string | null {
    if (!url) return null

    const handlePattern = /youtube\.com\/@([a-zA-Z0-9_.-]+)/
    const match = url.match(handlePattern)
    return match ? match[1] : null
  }

  /**
   * Extrait l'ID de vidéo YouTube à partir d'une URL
   */
  extractVideoId(url: string): string | null {
    if (!url) return null

    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
      /youtu\.be\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return match[1]
      }
    }

    return null
  }

  /**
   * Récupère les statistiques d'une chaîne YouTube par ID
   */
  async getChannelStats(channelId: string): Promise<YouTubeChannelStats | null> {
    if (!this.apiKey) {
      throw new Error('YouTube API key not configured')
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${this.apiKey}`
      )

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.items || data.items.length === 0) {
        return null
      }

      const channel = data.items[0]
      const stats = channel.statistics
      const snippet = channel.snippet

      return {
        subscriberCount: parseInt(stats.subscriberCount) || 0,
        viewCount: parseInt(stats.viewCount) || 0,
        videoCount: parseInt(stats.videoCount) || 0,
        channelId: channel.id,
        channelTitle: snippet.title,
      }
    } catch (error) {
      console.error('Error fetching YouTube channel stats:', error)
      return null
    }
  }

  /**
   * Récupère les statistiques d'une chaîne YouTube par handle (@username)
   */
  async getChannelStatsByHandle(handle: string): Promise<YouTubeChannelStats | null> {
    if (!this.apiKey) {
      throw new Error('YouTube API key not configured')
    }

    try {
      // Essayer d'abord avec le handle exact
      let searchQuery = handle
      
      // Si c'est un handle YouTube, essayer aussi avec le nom complet
      if (handle === 'KOFFI.OLOMIDE') {
        searchQuery = 'KOFFIOLOMIDIEU GOAT'
      }

      console.log('Searching for channel with query:', searchQuery)

      // D'abord, récupérer l'ID de chaîne à partir du handle ou du nom
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(searchQuery)}&key=${this.apiKey}`
      )

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`)
      }

      const data = await response.json()

      console.log('Search results:', data.items?.length || 0, 'channels found')

      if (!data.items || data.items.length === 0) {
        return null
      }

      // Prendre le premier résultat de recherche
      const channelId = data.items[0].snippet.channelId
      console.log('Found channel ID:', channelId)

      // Maintenant récupérer les statistiques avec l'ID
      return await this.getChannelStats(channelId)
    } catch (error) {
      console.error('Error fetching YouTube channel stats by handle:', error)
      return null
    }
  }

  /**
   * Récupère les statistiques d'une vidéo YouTube
   */
  async getVideoStats(videoId: string): Promise<YouTubeVideoStats | null> {
    if (!this.apiKey) {
      throw new Error('YouTube API key not configured')
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${this.apiKey}`
      )

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.items || data.items.length === 0) {
        return null
      }

      const video = data.items[0]
      const stats = video.statistics
      const snippet = video.snippet

      return {
        viewCount: parseInt(stats.viewCount) || 0,
        likeCount: parseInt(stats.likeCount) || 0,
        commentCount: parseInt(stats.commentCount) || 0,
        videoId: video.id,
        videoTitle: snippet.title,
      }
    } catch (error) {
      console.error('Error fetching YouTube video stats:', error)
      return null
    }
  }

  /**
   * Récupère automatiquement les statistiques YouTube à partir d'une URL
   */
  async getStatsFromUrl(url: string): Promise<{
    channelStats?: YouTubeChannelStats
    videoStats?: YouTubeVideoStats
  }> {
    if (!url) return {}

    const channelId = this.extractChannelId(url)
    const handle = this.extractHandle(url)
    const videoId = this.extractVideoId(url)

    const results: {
      channelStats?: YouTubeChannelStats
      videoStats?: YouTubeVideoStats
    } = {}

    // Essayer d'abord avec l'ID de chaîne direct
    if (channelId) {
      const channelStats = await this.getChannelStats(channelId)
      if (channelStats) {
        results.channelStats = channelStats
      }
    }
    
    // Si pas de résultats et qu'on a un handle, essayer avec le handle
    if (!results.channelStats && handle) {
      const channelStats = await this.getChannelStatsByHandle(handle)
      if (channelStats) {
        results.channelStats = channelStats
      }
    }

    // Si toujours pas de résultats, essayer avec une recherche par nom d'artiste
    if (!results.channelStats && url.includes('youtube.com')) {
      const channelStats = await this.searchArtistChannel(url)
      if (channelStats) {
        results.channelStats = channelStats
      }
    }

    if (videoId) {
      const videoStats = await this.getVideoStats(videoId)
      if (videoStats) {
        results.videoStats = videoStats
      }
    }

    return results
  }

  /**
   * Recherche une chaîne YouTube par nom d'artiste
   */
  async searchArtistChannel(url: string): Promise<YouTubeChannelStats | null> {
    if (!this.apiKey) {
      throw new Error('YouTube API key not configured')
    }

    try {
      // Extraire le nom de l'artiste de l'URL
      let artistName = ''
      
      if (url.includes('@KOFFI.OLOMIDE')) {
        artistName = 'KOFFIOLOMIDIEU GOAT'
      } else if (url.includes('@')) {
        // Extraire le nom après @
        const match = url.match(/@([^/]+)/)
        if (match) {
          artistName = match[1].replace(/\./g, ' ').toUpperCase()
        }
      }

      if (!artistName) {
        return null
      }

      console.log('Searching for artist channel:', artistName)

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(artistName)}&key=${this.apiKey}`
      )

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`)
      }

      const data = await response.json()

      console.log('Artist search results:', data.items?.length || 0, 'channels found')

      if (!data.items || data.items.length === 0) {
        // Essayer avec des termes de recherche alternatifs
        return await this.searchWithAlternativeTerms()
      }

      // Prendre le premier résultat de recherche
      const channelId = data.items[0].snippet.channelId
      console.log('Found artist channel ID:', channelId)

      // Récupérer les statistiques avec l'ID
      return await this.getChannelStats(channelId)
    } catch (error) {
      console.error('Error searching for artist channel:', error)
      return null
    }
  }

  /**
   * Recherche avec des termes alternatifs si la première recherche échoue
   */
  async searchWithAlternativeTerms(): Promise<YouTubeChannelStats | null> {
    if (!this.apiKey) {
      throw new Error('YouTube API key not configured')
    }

    try {
      // Termes de recherche alternatifs pour Koffi Olomidé
      const alternativeTerms = [
        'Koffi Olomidé',
        'KOFFIOLOMIDIEU',
        'Koffi Olomide',
        'Antoine Christophe Agbepa Mumba'
      ]

      for (const term of alternativeTerms) {
        console.log('Trying alternative search term:', term)
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(term)}&key=${this.apiKey}`
        )

        if (!response.ok) {
          continue
        }

        const data = await response.json()

        if (data.items && data.items.length > 0) {
          const channelId = data.items[0].snippet.channelId
          console.log('Found channel with alternative term:', term, 'ID:', channelId)
          
          // Vérifier que c'est bien la bonne chaîne
          const stats = await this.getChannelStats(channelId)
          if (stats && stats.channelTitle.toLowerCase().includes('koffi')) {
            return stats
          }
        }
      }

      return null
    } catch (error) {
      console.error('Error with alternative search terms:', error)
      return null
    }
  }

  /**
   * Formate un nombre pour l'affichage (ex: 1.2M, 500K)
   */
  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }
}

// Instance singleton
export const youtubeAPI = new YouTubeAPI()
