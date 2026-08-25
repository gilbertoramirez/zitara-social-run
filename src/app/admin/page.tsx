import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { registrations } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import AdminLoginForm from "@/components/admin/login-form";
import QrScanner from "@/components/admin/qr-scanner";
import RegistrationsTable from "@/components/admin/registrations-table";

export const metadata = {
  title: "Admin — Zítara Social Run",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) return <AdminLoginForm />;

  let allRegistrations: (typeof registrations.$inferSelect)[] = [];
  let stats = { total: 0, "3km": 0, "6km": 0, verificados: 0 };

  try {
    allRegistrations = await db
      .select()
      .from(registrations)
      .orderBy(desc(registrations.creadoEn));

    stats.total = allRegistrations.length;
    stats.verificados = allRegistrations.filter((r) => r.verificado).length;

    const routeCounts = await db
      .select({
        ruta: registrations.ruta,
        count: sql<number>`count(*)`,
      })
      .from(registrations)
      .groupBy(registrations.ruta);

    for (const rc of routeCounts) {
      if (rc.ruta in stats) {
        stats[rc.ruta as keyof typeof stats] = Number(rc.count);
      }
    }
  } catch (error) {
    console.error("Error loading admin data:", error);
  }

  return (
    <div className="min-h-screen bg-zitara-cream-light">
      <div className="bg-zitara-olive py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-gc-horizontal-olive.png"
              alt="Zítara Golf Club"
              width={160}
              height={44}
              className="h-10 w-auto"
            />
            <span className="text-[10px] text-zitara-gold font-medium tracking-widest uppercase">
              Admin
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-heading font-bold text-zitara-olive uppercase tracking-tight">
            Panel de Registros
          </h1>
          <QrScanner />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "bg-zitara-olive" },
            { label: "3 KM", value: stats["3km"], color: "bg-emerald-500" },
            { label: "6 KM", value: stats["6km"], color: "bg-blue-500" },
            {
              label: "Check-in",
              value: stats.verificados,
              color: "bg-amber-500",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold text-zitara-olive mt-1">
                {stat.value}
              </p>
              <div className={`w-8 h-1 ${stat.color} rounded-full mt-2`} />
            </div>
          ))}
        </div>

        <RegistrationsTable
          registrations={allRegistrations.map((reg) => ({
            id: reg.id,
            nombre: reg.nombre,
            email: reg.email,
            telefono: reg.telefono,
            ruta: reg.ruta,
            llevaraMascota: reg.llevaraMascota,
            nombreMascota: reg.nombreMascota,
            verificado: reg.verificado,
            creadoEn: reg.creadoEn.toLocaleDateString("es-MX"),
          }))}
        />
      </div>
    </div>
  );
}
