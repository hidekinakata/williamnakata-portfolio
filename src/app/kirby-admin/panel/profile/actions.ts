"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ProfileModel, ProfileTranslationModel } from "@db/models";

export async function uploadCV(formData: FormData, language: string) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("Arquivo não encontrado");

    const supabase = await createAdminClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `cv-${language}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from("cvs")
      .upload(filePath, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("cvs").getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("Erro no upload do CV:", error);
    return { success: false, error: "Falha no upload do arquivo" };
  }
}

export async function updateProfile(
  formData: ProfileModel & {
    translations: ProfileTranslationModel[];
  },
) {
  try {
    const { id, name, email, github, linkedin, instagram, translations } =
      formData;

    await prisma.profile.update({
      where: { id },
      data: {
        name,
        email,
        github,
        linkedin,
        instagram,
        translations: {
          upsert: translations.map((t) => ({
            where: {
              profileId_language: { profileId: id, language: t.language },
            },
            update: { bio: t.bio, cvUrl: t.cvUrl },
            create: { language: t.language, bio: t.bio, cvUrl: t.cvUrl },
          })),
        },
      },
    });

    revalidatePath("/kirby-admin/panel/profile");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return { error: "Falha ao atualizar perfil" };
  }
}

export async function getProfile() {
  try {
    let profile = await prisma.profile.findFirst({
      include: { translations: true },
    });

    if (!profile) {
      // Cria um perfil inicial se não existir
      profile = await prisma.profile.create({
        data: {
          name: "Seu Nome",
          translations: {
            create: [
              { language: "pt-BR", bio: "", cvUrl: "" },
              { language: "en", bio: "", cvUrl: "" },
            ],
          },
        },
        include: { translations: true },
      });
    }

    return profile;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return null;
  }
}
