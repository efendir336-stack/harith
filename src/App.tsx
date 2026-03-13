/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Building2, 
  FileText, 
  Settings, 
  Download, 
  PieChart as PieChartIcon, 
  LayoutDashboard,
  ChevronRight,
  Printer,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { calculateRAB } from './constants';
import { ProjectSpecs, RABCategory } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = ['#141414', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function App() {
  const [specs, setSpecs] = useState<ProjectSpecs>({
    length: 19,
    width: 18,
    height: 4.5,
    quality: 'standard'
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'details' | 'analysis'>('dashboard');

  const rabData = useMemo(() => calculateRAB(specs), [specs]);

  const totalCost = useMemo(() => {
    return rabData.reduce((acc, cat) => {
      return acc + cat.items.reduce((sum, item) => sum + item.totalPrice, 0);
    }, 0);
  }, [rabData]);

  const chartData = useMemo(() => {
    return rabData.map(cat => ({
      name: cat.title.split('. ')[1] || cat.title,
      value: cat.items.reduce((sum, item) => sum + item.totalPrice, 0)
    }));
  }, [rabData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#141414] font-sans flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-black/10 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-bottom border-black/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">RAB Masjid</h1>
            <p className="text-[10px] uppercase tracking-wider opacity-50 font-mono">Automated System v1.0</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
              activeTab === 'dashboard' ? "bg-black text-white shadow-lg" : "hover:bg-black/5"
            )}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('details')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
              activeTab === 'details' ? "bg-black text-white shadow-lg" : "hover:bg-black/5"
            )}
          >
            <FileText size={18} />
            Rincian RAB
          </button>
          <button 
            onClick={() => setActiveTab('analysis')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
              activeTab === 'analysis' ? "bg-black text-white shadow-lg" : "hover:bg-black/5"
            )}
          >
            <PieChartIcon size={18} />
            Analisis Biaya
          </button>
        </nav>

        <div className="p-6 border-t border-black/5 space-y-6">
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-widest opacity-50">Parameter Proyek</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium block mb-1">Panjang (m)</label>
                <input 
                  type="number" 
                  value={specs.length}
                  onChange={(e) => setSpecs({...specs, length: Number(e.target.value)})}
                  className="w-full bg-[#F5F5F5] border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Lebar (m)</label>
                <input 
                  type="number" 
                  value={specs.width}
                  onChange={(e) => setSpecs({...specs, width: Number(e.target.value)})}
                  className="w-full bg-[#F5F5F5] border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Tinggi (m)</label>
                <input 
                  type="number" 
                  value={specs.height}
                  onChange={(e) => setSpecs({...specs, height: Number(e.target.value)})}
                  className="w-full bg-[#F5F5F5] border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Kualitas Material</label>
                <select 
                  value={specs.quality}
                  onChange={(e) => setSpecs({...specs, quality: e.target.value as any})}
                  className="w-full bg-[#F5F5F5] border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="standard">Standar</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-black text-white p-4 rounded-2xl space-y-1">
            <p className="text-[10px] uppercase tracking-widest opacity-60">Total Estimasi</p>
            <p className="text-xl font-bold leading-none">{formatCurrency(totalCost)}</p>
            <p className="text-[10px] opacity-40 italic">Estimasi kasar ±15%</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {activeTab === 'dashboard' && "Dashboard Proyek"}
              {activeTab === 'details' && "Rincian Anggaran Biaya"}
              {activeTab === 'analysis' && "Analisis Distribusi Biaya"}
            </h2>
            <p className="text-black/50 text-sm">Pembangunan Masjid Beton {specs.length}m x {specs.width}m</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-xl text-sm font-medium hover:bg-black/5 transition-all"
            >
              <Printer size={16} />
              Cetak PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">
              <Download size={16} />
              Export Excel
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Luas Bangunan', value: `${specs.length * specs.width} m2`, icon: Building2, color: 'bg-blue-500' },
                { label: 'Keliling Dinding', value: `${2 * (specs.length + specs.width)} m1`, icon: ChevronRight, color: 'bg-emerald-500' },
                { label: 'Volume Beton Est.', value: `${(specs.length * specs.width * 0.25).toFixed(1)} m3`, icon: Calculator, color: 'bg-amber-500' },
                { label: 'Biaya per m2', value: formatCurrency(totalCost / (specs.length * specs.width)), icon: Info, color: 'bg-purple-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", stat.color)}>
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-mono opacity-50">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <PieChartIcon size={20} className="text-blue-500" />
                  Distribusi Biaya per Kategori
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="value" fill="#141414" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-6">
                <h3 className="text-lg font-bold mb-2">Status Proyek</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Perhitungan Struktur', status: 'Selesai', icon: CheckCircle2, color: 'text-emerald-500' },
                    { label: 'Estimasi Material', status: 'Selesai', icon: CheckCircle2, color: 'text-emerald-500' },
                    { label: 'Analisis Tenaga Kerja', status: 'Otomatis', icon: Info, color: 'text-blue-500' },
                    { label: 'Validasi Harga Pasar', status: 'Update 2024', icon: AlertCircle, color: 'text-amber-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#F9F9F9] rounded-xl">
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className={item.color} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase opacity-50">{item.status}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <button className="w-full py-3 bg-black text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all">
                    Generate Laporan Lengkap
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9F9F9] border-b border-black/5">
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest opacity-50">No</th>
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest opacity-50">Uraian Pekerjaan</th>
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest opacity-50 text-center">Satuan</th>
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest opacity-50 text-right">Volume</th>
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest opacity-50 text-right">Harga Satuan</th>
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest opacity-50 text-right">Jumlah Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {rabData.map((category, catIdx) => (
                    <React.Fragment key={category.id}>
                      <tr className="bg-black/5">
                        <td className="px-6 py-3 font-bold text-sm" colSpan={5}>{category.title}</td>
                        <td className="px-6 py-3 font-bold text-sm text-right">
                          {formatCurrency(category.items.reduce((sum, item) => sum + item.totalPrice, 0))}
                        </td>
                      </tr>
                      {category.items.map((item, itemIdx) => (
                        <tr key={item.id} className="border-b border-black/5 hover:bg-black/[0.02] transition-colors">
                          <td className="px-6 py-4 text-sm opacity-50">{itemIdx + 1}</td>
                          <td className="px-6 py-4 text-sm font-medium">{item.description}</td>
                          <td className="px-6 py-4 text-sm text-center">{item.unit}</td>
                          <td className="px-6 py-4 text-sm text-right">{item.quantity.toLocaleString('id-ID', { maximumFractionDigits: 2 })}</td>
                          <td className="px-6 py-4 text-sm text-right">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-6 py-4 text-sm text-right font-semibold">{formatCurrency(item.totalPrice)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-black text-white">
                    <td className="px-6 py-6 text-lg font-bold" colSpan={5}>TOTAL ESTIMASI BIAYA PEMBANGUNAN</td>
                    <td className="px-6 py-6 text-lg font-bold text-right">{formatCurrency(totalCost)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
              <h3 className="text-xl font-bold mb-8">Persentase Biaya per Kategori</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Rangkuman Eksekutif</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Berdasarkan dimensi <strong>{specs.length}m x {specs.width}m</strong>, proyek ini dikategorikan sebagai masjid ukuran menengah. 
                      Biaya terbesar berada pada sektor <strong>Pekerjaan Beton Struktur</strong> yang mencakup ±35% dari total anggaran.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#F9F9F9] rounded-2xl">
                      <p className="text-[10px] uppercase font-mono opacity-50 mb-1">Kebutuhan Semen</p>
                      <p className="text-lg font-bold">~1,250 Sak</p>
                    </div>
                    <div className="p-4 bg-[#F9F9F9] rounded-2xl">
                      <p className="text-[10px] uppercase font-mono opacity-50 mb-1">Kebutuhan Besi</p>
                      <p className="text-lg font-bold">~4.2 Ton</p>
                    </div>
                    <div className="p-4 bg-[#F9F9F9] rounded-2xl">
                      <p className="text-[10px] uppercase font-mono opacity-50 mb-1">Tenaga Kerja</p>
                      <p className="text-lg font-bold">~15 Orang</p>
                    </div>
                    <div className="p-4 bg-[#F9F9F9] rounded-2xl">
                      <p className="text-[10px] uppercase font-mono opacity-50 mb-1">Durasi Est.</p>
                      <p className="text-lg font-bold">6-8 Bulan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <AlertCircle size={20} />
                  Catatan Penting
                </h3>
                <ul className="text-sm text-amber-800 space-y-2 list-disc pl-4">
                  <li>Harga satuan dapat berubah sewaktu-waktu mengikuti fluktuasi pasar material.</li>
                  <li>Belum termasuk biaya perizinan (IMB/PBG) dan penyambungan daya listrik/air.</li>
                  <li>Disarankan menambahkan dana tak terduga (contingency) sebesar 10% dari total RAB.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          aside { display: none !important; }
          main { width: 100% !important; padding: 0 !important; }
          header { display: none !important; }
          .bg-white { border: none !important; box-shadow: none !important; }
          table { font-size: 10px !important; }
          tr { page-break-inside: avoid; }
        }
      `}} />
    </div>
  );
}
