"use client"

import { Calendar, GraduationCap, Briefcase, Heart, Users, Plus, LayoutGrid, BookOpen, Landmark, MessageSquare, Newspaper } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary text-white flex items-center justify-center shadow-soft">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900">Admin • Dashboard</h1>
            <p className="text-xs text-gray-500">Gérez le contenu et les activités de la plateforme</p>
          </div>
          <Link href="/" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
            <Users className="w-4 h-4" />
            Aller au site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Actions Rapides */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {quickActions.map((a) => (
              <Link
                key={a.title}
                href={a.href}
                className={`group relative overflow-hidden rounded-2xl p-5 text-white shadow-strong transition-transform hover:scale-[1.01] ${a.gradient}`}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-sm/5 opacity-90">{a.subtitle}</p>
                    <h3 className="text-base font-extrabold">{a.title}</h3>
                  </div>
                </div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold opacity-95">
                  <Plus className="w-3.5 h-3.5" /> Créer
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Statistiques */}
        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-3">Statistiques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-gray-200 p-5 shadow-soft">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    {s.icon}
                    <span className="text-sm font-semibold">{s.label}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold">{s.delta}</span>
                </div>
                <div className="text-3xl font-extrabold text-gray-900">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Gestion du contenu */}
        <section>
          <h2 className="text-sm font-bold text-gray-800 mb-3">Gestion du contenu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {management.map((m) => (
              <Link
                key={m.title}
                href={m.href}
                className="flex items-center gap-4 rounded-2xl bg-white border border-gray-200 p-5 shadow-soft hover:shadow-strong transition-shadow"
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${m.badgeBg} text-white`}>{m.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{m.title}</h3>
                  <p className="text-sm text-gray-600">{m.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

const quickActions = [
  {
    title: "Nouvel Événement",
    subtitle: "Créer un nouvel événement",
    href: "/admin/events/new",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-500",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    title: "Nouvelle Formation",
    subtitle: "Ajouter une formation",
    href: "/admin/formations/new",
    gradient: "bg-gradient-to-br from-emerald-500 to-green-500",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    title: "Nouvelle Opportunité",
    subtitle: "Publier une opportunité",
    href: "/admin/opportunites/new",
    gradient: "bg-gradient-to-br from-fuchsia-500 to-purple-500",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    title: "Nouvelle Action",
    subtitle: "Créer une action de donation",
    href: "/admin/actions/new",
    gradient: "bg-gradient-to-br from-rose-500 to-red-500",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    title: "Nouveau Post",
    subtitle: "Créer un post communauté",
    href: "/admin/posts/new",
    gradient: "bg-gradient-to-br from-orange-500 to-amber-500",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: "Nouvelle Actualité",
    subtitle: "Publier une actualité",
    href: "/admin/actualites/new",
    gradient: "bg-gradient-to-br from-cyan-500 to-sky-500",
    icon: <Newspaper className="w-5 h-5" />,
  },
] as const

const stats = [
  { label: "Événements", value: 12, delta: "+2 ce mois", icon: <Calendar className="w-4 h-4 text-blue-600" /> },
  { label: "Formations", value: 8, delta: "+1 cette semaine", icon: <GraduationCap className="w-4 h-4 text-emerald-600" /> },
  { label: "Opportunités", value: 15, delta: "+5 ce mois", icon: <Briefcase className="w-4 h-4 text-fuchsia-600" /> },
  { label: "Actions Donation", value: 6, delta: "+2 ce mois", icon: <Heart className="w-4 h-4 text-rose-600" /> },
  { label: "Posts Communauté", value: 23, delta: "+8 cette semaine", icon: <MessageSquare className="w-4 h-4 text-orange-600" /> },
] as const

const management = [
  { title: "Événements", subtitle: "Gérer les événements", href: "/admin/events", badgeBg: "bg-blue-500", icon: <Calendar className="w-6 h-6" /> },
  { title: "Formations", subtitle: "Gérer les formations", href: "/admin/formations", badgeBg: "bg-emerald-500", icon: <BookOpen className="w-6 h-6" /> },
  { title: "Opportunités", subtitle: "Gérer les opportunités", href: "/admin/opportunites", badgeBg: "bg-fuchsia-500", icon: <Briefcase className="w-6 h-6" /> },
  { title: "Communauté", subtitle: "Gérer les communautés", href: "/admin/communaute", badgeBg: "bg-indigo-500", icon: <Users className="w-6 h-6" /> },
  { title: "Donations", subtitle: "Gérer les donations", href: "/admin/donations", badgeBg: "bg-rose-500", icon: <Landmark className="w-6 h-6" /> },
  { title: "Actualités", subtitle: "Gérer les actualités", href: "/admin/actualites", badgeBg: "bg-sky-500", icon: <Newspaper className="w-6 h-6" /> },
] as const


