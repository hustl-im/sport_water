import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Settings, RefreshCw } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export function AdminSettingsPage() {
  const { data: settings, isLoading, refetch } = useSettings();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(formData)) {
        await supabase.from("settings").upsert({ key, value }, { onConflict: "key" });
      }
      toast.success("Settings saved");
      refetch();
      setFormData({});
    } catch {
      toast.error("Failed to save settings");
    }
    setSaving(false);
  };

  const getValue = (key: string) => formData[key] ?? settings?.[key] ?? "";

  const settingGroups = [
    {
      title: "Company Information",
      fields: [
        { key: "company_name", label: "Company Name" },
        { key: "company_phone", label: "Phone Number" },
        { key: "company_email", label: "Email" },
        { key: "company_address", label: "Address" },
      ],
    },
    {
      title: "Homepage",
      fields: [
        { key: "hero_title", label: "Hero Title" },
        { key: "hero_subtitle", label: "Hero Subtitle" },
      ],
    },
    {
      title: "About Page",
      fields: [
        { key: "about_mission", label: "Mission" },
        { key: "about_vision", label: "Vision" },
        { key: "about_quality", label: "Quality" },
        { key: "about_delivery", label: "Delivery" },
      ],
    },
    {
      title: "Media",
      fields: [
        { key: "video_url", label: "Video URL" },
        { key: "video_poster", label: "Video Poster URL" },
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Settings className="w-6 h-6 text-primary-500" />
              Settings
            </h1>
            <button
              onClick={handleSave}
              disabled={saving || Object.keys(formData).length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>

          <div className="space-y-8">
            {settingGroups.map((group) => (
              <div key={group.title} className="card dark:card-dark p-6">
                <h2 className="text-lg font-poppins font-semibold text-gray-900 dark:text-white mb-6">
                  {group.title}
                </h2>
                <div className="space-y-4">
                  {group.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                      </label>
                      {field.key.includes("about") || field.key.includes("subtitle") ? (
                        <textarea
                          value={getValue(field.key)}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                          }
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={getValue(field.key)}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
