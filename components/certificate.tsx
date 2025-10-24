"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Award, Download, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface CertificateProps {
  certificateNumber: string
  studentName: string
  courseName: string
  hours: number
  stateCode: string
  completionDate: string
}

export function Certificate({
  certificateNumber,
  studentName,
  courseName,
  hours,
  stateCode,
  completionDate,
}: CertificateProps) {
  const router = useRouter()

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between print:hidden">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </div>

        <Card className="p-12 bg-white print:shadow-none" id="certificate">
          {/* Certificate Border */}
          <div className="border-8 border-double border-primary p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <Award className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl font-serif font-bold text-primary mb-2">Certificate of Completion</h1>
              <p className="text-sm text-muted-foreground">Continuing Education for Licensed Contractors</p>
            </div>

            {/* Body */}
            <div className="text-center space-y-6 mb-8">
              <p className="text-lg">This certifies that</p>

              <div className="py-4 border-b-2 border-primary">
                <p className="text-3xl font-serif font-bold text-primary">{studentName}</p>
              </div>

              <p className="text-lg">has successfully completed</p>

              <div className="py-4">
                <p className="text-2xl font-semibold mb-2">{courseName}</p>
                <p className="text-muted-foreground">
                  {hours} Hour{hours > 1 ? "s" : ""} • {stateCode} Approved
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 max-w-md mx-auto pt-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completion Date</p>
                  <p className="font-semibold">{completionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Certificate Number</p>
                  <p className="font-semibold font-mono text-sm">{certificateNumber}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t mt-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="border-t-2 border-foreground pt-2 mb-2 max-w-[200px] mx-auto">
                    <p className="font-semibold">Authorized Signature</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Program Director</p>
                </div>
                <div className="text-center">
                  <div className="border-t-2 border-foreground pt-2 mb-2 max-w-[200px] mx-auto">
                    <p className="font-semibold">{completionDate}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Date Issued</p>
                </div>
              </div>
            </div>

            {/* Seal */}
            <div className="mt-8 text-center">
              <div className="inline-block p-4 rounded-full border-4 border-primary bg-primary/5">
                <Award className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground print:hidden">
          <p>This certificate is valid for continuing education credit in {stateCode}.</p>
          <p className="mt-2">Certificate Number: {certificateNumber}</p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  )
}
