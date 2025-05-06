
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const fetchFavorites = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('favorites')
      .select('*, models(*)')
      .eq('user_id', user.id);
    
    if (error) {
      console.error("Error fetching favorites:", error);
      throw error;
    }
    
    return data;
  };
  
  const addFavorite = async (modelId: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    const { error } = await supabase
      .from('favorites')
      .insert({ user_id: user.id, model_id: modelId });
    
    if (error) {
      if (error.code === '23505') {
        // Unique constraint violation - model already favorited
        throw new Error("Model already in favorites");
      }
      throw error;
    }
    
    return { modelId };
  };
  
  const removeFavorite = async (modelId: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('model_id', modelId);
    
    if (error) {
      throw error;
    }
    
    return { modelId };
  };
  
  const toggleFavorite = async (modelId: string, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await removeFavorite(modelId);
        return false;
      } else {
        await addFavorite(modelId);
        return true;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update favorites",
        variant: "destructive"
      });
      return isFavorite;
    }
  };
  
  const { data: favorites = [], isLoading, error } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: fetchFavorites,
    enabled: !!user
  });
  
  const addFavoriteMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast({
        title: "Added to Favorites",
        description: "Model has been added to your favorites",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add to favorites",
        variant: "destructive"
      });
    }
  });
  
  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast({
        title: "Removed from Favorites",
        description: "Model has been removed from your favorites",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove from favorites",
        variant: "destructive"
      });
    }
  });
  
  const toggleFavoriteMutation = useMutation({
    mutationFn: ({ modelId, isFavorite }: { modelId: string, isFavorite: boolean }) => 
      toggleFavorite(modelId, isFavorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });
  
  const favoriteModelIds = favorites.map((fav: any) => fav.model_id);
  
  const isFavorite = (modelId: string) => favoriteModelIds.includes(modelId);
  
  return {
    favorites,
    favoriteModelIds,
    isLoading,
    error,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
    toggleFavorite: toggleFavoriteMutation.mutate,
    isFavorite
  };
};
