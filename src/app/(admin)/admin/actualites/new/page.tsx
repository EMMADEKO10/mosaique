"use client"

import { useState, useRef } from "react"
// import { addArticle, Article } from "../../../../../data/actualites"
import { useRouter } from "next/navigation"
import { Calendar, Tag, Image as ImageIcon, Save, Upload, X, Globe, Eye, EyeOff } from "lucide-react"

export default function NewActualitePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "cinema",
    author: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    readTime: 4,
    tags: "",
    featured: false,
    sponsored: false,
    status: "draft" as "draft" | "published" | "archived",
    metaTitle: "",
    metaDescription: "",
  })
  const [saving, setSaving] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else if (name === 'readTime') {
      setForm(prev => ({ ...prev, readTime: Number(value) || 0 }))
    } else if (name === 'status') {
      setForm(prev => ({ ...prev, status: value as "draft" | "published" | "archived" }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide')
        return
      }
      
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L&apos;image doit faire moins de 5MB')
        return
      }

      setSelectedFile(file)
      
      // Créer une prévisualisation
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      
      let imageData = form.image.trim()
      
      // Si un fichier est sélectionné, le convertir en base64
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

      const payload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        image: imageData,
        category: form.category,
        author: form.author.trim(),
        publishedAt: form.publishedAt,
        readTime: Math.max(1, form.readTime),
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        featured: !!form.featured,
        sponsored: !!form.sponsored,
        status: form.status,
        metaTitle: form.metaTitle.trim(),
        metaDescription: form.metaDescription.trim(),
      }

      const res = await fetch('/api/actualites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 409) {
          // Erreur de doublon de titre
          throw new Error('Ce titre existe déjà. Veuillez modifier le titre de l\'article.')
        } else {
          throw new Error(data?.message || 'Erreur lors de la création de l\'article')
        }
      }

      // Succès
      alert('Article créé avec succès !')
      router.push('/actualites')
    } catch (err) {
      console.error(err)
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inattendue s\'est produite'
      alert('Erreur: ' + errorMessage)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl font-extrabold text-gray-900 mb-4">Nouvelle Actualité</h1>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-soft p-4 sm:p-6 space-y-6">
          {/* Informations principales */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Informations principales</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Titre</label>
                <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Catégorie</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Résumé</label>
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Contenu</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows={6} className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          {/* Section Upload d'Image */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Image de l&apos;article</h2>
            
            {!imagePreview ? (
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
                <img 
                  src={imagePreview} 
                  alt="Prévisualisation" 
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
            
            {/* URL de secours */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1">Ou entrer une URL d&apos;image</label>
              <input 
                name="image" 
                value={form.image} 
                onChange={handleChange} 
                placeholder="https://..." 
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
              />
            </div>
          </div>

          {/* Métadonnées et options */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Métadonnées et options</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Auteur</label>
                <input name="author" value={form.author} onChange={handleChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1"><Calendar className="w-4 h-4" /> Date</label>
                <input type="date" name="publishedAt" value={form.publishedAt} onChange={handleChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Temps de lecture (min)</label>
                <input type="number" min={1} name="readTime" value={form.readTime} onChange={handleChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1"><Tag className="w-4 h-4" /> Tags (séparés par virgules)</label>
                <input name="tags" value={form.tags} onChange={handleChange} placeholder="musique, kinshasa" className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>

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
                <label htmlFor="featured" className="text-sm font-medium text-gray-800">À la une</label>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input id="sponsored" type="checkbox" name="sponsored" checked={!!form.sponsored} onChange={handleChange} className="h-4 w-4" />
                <label htmlFor="sponsored" className="text-sm font-medium text-gray-800">Sponsorisé</label>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              SEO
            </h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Titre SEO (meta title)</label>
              <input 
                name="metaTitle" 
                value={form.metaTitle} 
                onChange={handleChange} 
                placeholder="Titre optimisé pour les moteurs de recherche"
                maxLength={60}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
              />
              <p className="text-xs text-gray-500 mt-1">{form.metaTitle.length}/60 caractères</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Description SEO (meta description)</label>
              <textarea 
                name="metaDescription" 
                value={form.metaDescription} 
                onChange={handleChange} 
                rows={3}
                placeholder="Description optimisée pour les moteurs de recherche"
                maxLength={160}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
              />
              <p className="text-xs text-gray-500 mt-1">{form.metaDescription.length}/160 caractères</p>
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

const categories = [
  "cinema",
  "clash",
  "comedie",
  "decouverte",
  "education",
  "enquete",
  "evenements",
  "recompense",
  "lifestyle",
] as const


