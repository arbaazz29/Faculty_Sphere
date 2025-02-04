import { supabase } from './supabase';

interface ProfileUpdate {
  name: string;
  email: string;
  image: File | string;
  department: string;
}

export const updateProfile = async (userId: string, data: ProfileUpdate) => {
  try {
    let imageUrl = data.image;

    if (data.image instanceof File) {
      const fileExt = data.image.name.split('.').pop();
      const filePath = `${userId}/profile.${fileExt}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('faculty-images')
        .upload(filePath, data.image, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('faculty-images')
        .getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    const { error } = await supabase
      .from('faculty_profiles')
      .upsert({
        user_id: userId,
        name: data.name,
        email: data.email,
        image: imageUrl,
        department: data.department,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};