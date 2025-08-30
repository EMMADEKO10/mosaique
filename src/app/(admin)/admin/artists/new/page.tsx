"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { 
  Save, 
  Upload, 
  X, 
  Globe, 
  Eye, 
  EyeOff, 
  Music, 
  MapPin, 
  Award,
  Plus,
  Trash2,
  Youtube
} from "lucide-react"
import YouTubeStats from "@/components/ui/YouTubeStats"

interface Album {
  id: string
  title: string
  year: number
  coverUrl: string
  tracksCount: number
  link?: string
}

interface Track {
  id: string
  title: string
  duration: string
}

interface Socials {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  tiktok?: string
  website?: string
}

interface Stats {
  followers?: number
  monthlyListeners?: number
  awards?: number
}

export default function NewArtistPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    name: "",
    location: "",
    specialty: "",
    biography: "",
    label: "",
    yearsActive: "",
    featured: false,
    status: "draft" as "draft" | "published" | "archived",
  })
  const [saving, setSaving] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [imageUrl, setImageUrl] = useState("")
  
  // Réseaux sociaux
  const [socials, setSocials] = useState<Socials>({})
  
  // Statistiques
  const [stats, setStats] = useState<Stats>({})
  // const [loadingYouTube, setLoadingYouTube] = useState(false)
  
  // Albums et tracks
  const [albums, setAlbums] = useState<Album[]>([])
  const [topTracks, setTopTracks] = useState<Track[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else if (name === 'status') {
      setForm(prev => ({ ...prev, status: value as "draft" | "published" | "archived" }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSocialsChange = (platform: keyof Socials, value: string) => {
    setSocials(prev => ({
      ...prev,
      [platform]: value
    }))
  }

  const handleStatsChange = (stat: keyof Stats, value: string) => {
    setStats(prev => ({
      ...prev,
      [stat]: value ? parseInt(value) : undefined
    }))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('L&apos;image doit faire moins de 5MB')
        return
      }

      setSelectedFile(file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedFile(null)
    setImagePreview("")
    setImageUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const addAlbum = () => {
    const newAlbum: Album = {
      id: `album-${Date.now()}`,
      title: "",
      year: new Date().getFullYear(),
      coverUrl: "/mosaique/default-album-cover.jpg",
      tracksCount: 0,
      link: ""
    }
    setAlbums(prev => [...prev, newAlbum])
  }

  const updateAlbum = (id: string, field: keyof Album, value: string | number) => {
    setAlbums(prev => prev.map(album => 
      album.id === id ? { ...album, [field]: value } : album
    ))
  }

  const removeAlbum = (id: string) => {
    setAlbums(prev => prev.filter(album => album.id !== id))
  }

  const addTrack = () => {
    const newTrack: Track = {
      id: `track-${Date.now()}`,
      title: "",
      duration: "0:00"
    }
    setTopTracks(prev => [...prev, newTrack])
  }

  const updateTrack = (id: string, field: keyof Track, value: string) => {
    setTopTracks(prev => prev.map(track => 
      track.id === id ? { ...track, [field]: value } : track
    ))
  }

  const removeTrack = (id: string) => {
    setTopTracks(prev => prev.filter(track => track.id !== id))
  }

  // Fonction pour mettre à jour les statistiques depuis YouTube
  const handleYouTubeStatsUpdate = (youtubeStats: { followers?: number; monthlyListeners?: number }) => {
    setStats(prev => ({
      ...prev,
      ...youtubeStats
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      
      let imageData = imageUrl.trim()
      
      if (selectedFile) {
        const reader = new FileReader()
        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = (e) => {
            resolve(e.target?.result as string)
          }
        })
        reader.readAsDataURL(selectedFile)
        imageData = await base64Promise
      }

      // Filtrer et nettoyer les albums et tracks
      const validAlbums = albums
        .filter(album => album.title.trim())
        .map(album => ({
          ...album,
          coverUrl: album.coverUrl || "/mosaique/default-album-cover.jpg",
          title: album.title.trim()
        }))

      const validTracks = topTracks
        .filter(track => track.title.trim())
        .map(track => ({
          ...track,
          title: track.title.trim()
        }))

      const payload = {
        name: form.name.trim(),
        image: imageData,
        location: form.location.trim(),
        specialty: form.specialty.trim(),
        biography: form.biography.trim(),
        label: form.label.trim(),
        yearsActive: form.yearsActive.trim(),
        socials,
        stats,
        albums: validAlbums,
        topTracks: validTracks,
        featured: !!form.featured,
        status: form.status,
      }

      const res = await fetch('/api/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error('Ce nom d&apos;artiste existe déjà. Veuillez modifier le nom.')
        } else {
          throw new Error(data?.message || 'Erreur lors de la création de l&apos;artiste')
        }
      }

      alert('Artiste créé avec succès !')
      router.push('/artistes')
    } catch (err) {
      console.error(err)
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inattendue s&apos;est produite'
      alert('Erreur: ' + errorMessage)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl font-extrabold text-gray-900 mb-4">Nouvel Artiste</h1>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-soft p-4 sm:p-6 space-y-6">
          
          {/* Informations principales */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Informations principales</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Nom de l&apos;artiste</label>
                <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1"><MapPin className="w-4 h-4" /> Localisation</label>
                <input name="location" value={form.location} onChange={handleChange} placeholder="Kinshasa, RDC" className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1"><Music className="w-4 h-4" /> Spécialité</label>
                <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="Rumba, Afrobeat" className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800 mb-1">Label</label>
                <input name="label" value={form.label} onChange={handleChange} placeholder="Nom du label" className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>

            <div>
                              <label className="text-sm font-semibold text-gray-800 mb-1">Années d&apos;activité</label>
              <input name="yearsActive" value={form.yearsActive} onChange={handleChange} placeholder="1999 – présent" className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Biographie</label>
              <textarea name="biography" value={form.biography} onChange={handleChange} rows={4} required className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Photo de l&apos;artiste</h2>
            
            {!imagePreview && !imageUrl ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Choisir une image
                </button>
                <p className="text-sm text-gray-500 mt-2">JPG, PNG, WebP - Max 5MB</p>
              </div>
            ) : (
              <div className="relative">
                <Image 
                  src={imagePreview || imageUrl} 
                  alt="Prévisualisation" 
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1">Ou entrer une URL d&apos;image</label>
              <input 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..." 
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
              />
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Réseaux sociaux
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">Facebook</label>
                <input 
                  value={socials.facebook || ''} 
                  onChange={(e) => handleSocialsChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/..." 
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">Instagram</label>
                <input 
                  value={socials.instagram || ''} 
                  onChange={(e) => handleSocialsChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/..." 
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">Twitter</label>
                <input 
                  value={socials.twitter || ''} 
                  onChange={(e) => handleSocialsChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/..." 
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                />
              </div>
                             <div>
                 <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                   <Youtube className="w-4 h-4" />
                   YouTube
                 </label>
                 <input 
                   value={socials.youtube || ''} 
                   onChange={(e) => handleSocialsChange('youtube', e.target.value)}
                   placeholder="https://youtube.com/..." 
                   className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                 />
               </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">TikTok</label>
                <input 
                  value={socials.tiktok || ''} 
                  onChange={(e) => handleSocialsChange('tiktok', e.target.value)}
                  placeholder="https://tiktok.com/..." 
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">Site web</label>
                <input 
                  value={socials.website || ''} 
                  onChange={(e) => handleSocialsChange('website', e.target.value)}
                  placeholder="https://..." 
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                />
              </div>
            </div>
          </div>

                     {/* Statistiques */}
           <div className="space-y-4">
             <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
               <Award className="w-5 h-5" />
               Statistiques
             </h2>
             
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
               <div>
                 <label className="text-sm font-medium text-gray-700 mb-1">Abonnés</label>
                 <input 
                   type="number"
                   value={stats.followers || ''} 
                   onChange={(e) => handleStatsChange('followers', e.target.value)}
                   placeholder="1000000" 
                   className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                 />
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-700 mb-1">Auditeurs mensuels</label>
                 <input 
                   type="number"
                   value={stats.monthlyListeners || ''} 
                   onChange={(e) => handleStatsChange('monthlyListeners', e.target.value)}
                   placeholder="500000" 
                   className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                 />
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-700 mb-1">Récompenses</label>
                 <input 
                   type="number"
                   value={stats.awards || ''} 
                   onChange={(e) => handleStatsChange('awards', e.target.value)}
                   placeholder="10" 
                   className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                 />
               </div>
             </div>

             {/* Statistiques YouTube automatiques */}
             {socials.youtube && (
               <YouTubeStats 
                 url={socials.youtube}
                 onStatsUpdate={handleYouTubeStatsUpdate}
                 className="mt-4"
               />
             )}
           </div>

          {/* Albums */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h2 className="text-lg font-semibold text-gray-800">Albums</h2>
              <button
                type="button"
                onClick={addAlbum}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Ajouter un album
              </button>
            </div>
            
            {albums.map((album, index) => (
              <div key={album.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">Album {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeAlbum(album.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                   <div>
                     <label className="text-sm font-medium text-gray-700 mb-1">Titre</label>
                     <input 
                       value={album.title} 
                       onChange={(e) => updateAlbum(album.id, 'title', e.target.value)}
                       placeholder="Nom de l&apos;album" 
                       className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                     />
                   </div>
                   <div>
                     <label className="text-sm font-medium text-gray-700 mb-1">Année</label>
                     <input 
                       type="number"
                       value={album.year} 
                       onChange={(e) => updateAlbum(album.id, 'year', parseInt(e.target.value))}
                       className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                     />
                   </div>
                   <div>
                     <label className="text-sm font-medium text-gray-700 mb-1">Nombre de pistes</label>
                     <input 
                       type="number"
                       value={album.tracksCount} 
                       onChange={(e) => updateAlbum(album.id, 'tracksCount', parseInt(e.target.value))}
                       className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                     />
                   </div>
                   <div>
                     <label className="text-sm font-medium text-gray-700 mb-1">Lien</label>
                     <input 
                       value={album.link || ''} 
                       onChange={(e) => updateAlbum(album.id, 'link', e.target.value)}
                       placeholder="https://..." 
                       className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                     />
                   </div>
                   <div className="sm:col-span-2">
                     <label className="text-sm font-medium text-gray-700 mb-1">URL de couverture</label>
                     <input 
                       value={album.coverUrl || ''} 
                       onChange={(e) => updateAlbum(album.id, 'coverUrl', e.target.value)}
                       placeholder="https://..." 
                       className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                     />
                   </div>
                 </div>
              </div>
            ))}
          </div>

          {/* Top Tracks */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h2 className="text-lg font-semibold text-gray-800">Top Tracks</h2>
              <button
                type="button"
                onClick={addTrack}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Ajouter une piste
              </button>
            </div>
            
            {topTracks.map((track, index) => (
              <div key={track.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">Piste {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeTrack(track.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">Titre</label>
                    <input 
                      value={track.title} 
                      onChange={(e) => updateTrack(track.id, 'title', e.target.value)}
                      placeholder="Nom de la piste" 
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1">Durée</label>
                    <input 
                      value={track.duration} 
                      onChange={(e) => updateTrack(track.id, 'duration', e.target.value)}
                      placeholder="3:45" 
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Options</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1">
                  {form.status === 'published' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />} 
                  Statut
                </label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input id="featured" type="checkbox" name="featured" checked={!!form.featured} onChange={handleChange} className="h-4 w-4" />
                <label htmlFor="featured" className="text-sm font-medium text-gray-800">Artiste vedette</label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50">Annuler</button>
            <button disabled={saving} className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-primary text-white font-semibold shadow-glow hover:shadow-glow-lg disabled:opacity-60">
              <Save className="w-4 h-4" />
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
