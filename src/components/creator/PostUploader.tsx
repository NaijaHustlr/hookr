
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCreatePost } from "@/hooks/usePosts";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { X, Upload, Image, Video } from "lucide-react";

const PostUploader: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isCreator } = useAuth();
  
  const createPost = useCreatePost();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const selectedFile = e.target.files[0];
    
    // Validate file type
    if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
      toast.error("Please upload an image or video file");
      return;
    }
    
    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const resetForm = () => {
    setPreview(null);
    setFile(null);
    setCaption("");
    setTags([]);
    setTagInput("");
    setIsPremium(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    try {
      setIsUploading(true);
      await createPost.mutateAsync({
        file,
        caption: caption.trim() || undefined,
        tags: tags.length > 0 ? tags : undefined,
        isPremium
      });
      
      resetForm();
      toast.success("Post uploaded successfully");
    } catch (error) {
      console.error("Error uploading post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isCreator) {
    return (
      <Card className="bg-hookr-muted">
        <CardContent className="p-6 text-center">
          <p className="text-hookr-light">Only approved creators can upload content.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-hookr-muted">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {preview ? (
            <div className="relative">
              <div className="aspect-video bg-black/20 rounded-lg overflow-hidden flex items-center justify-center">
                {file?.type.startsWith('image/') ? (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-full max-w-full object-contain" 
                  />
                ) : (
                  <video 
                    src={preview} 
                    controls 
                    className="max-h-full max-w-full" 
                  />
                )}
              </div>
              <Button 
                type="button" 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 rounded-full w-8 h-8"
                onClick={resetForm}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-hookr-light/20 rounded-lg p-10 text-center cursor-pointer hover:border-hookr-accent/40 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-10 w-10 text-hookr-light/40 mx-auto mb-3" />
              <p className="text-hookr-light">
                Click to upload an image or video
              </p>
              <p className="text-hookr-light/60 text-sm mt-1">
                Max file size: 10MB
              </p>
              <div className="flex justify-center mt-2 gap-2">
                <Image className="h-4 w-4 text-hookr-light/60" />
                <Video className="h-4 w-4 text-hookr-light/60" />
              </div>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          
          <Textarea 
            placeholder="Write a caption..." 
            className="bg-hookr-dark text-hookr-light border-hookr-light/20 resize-none"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          
          <div className="space-y-2">
            <Label className="text-hookr-light">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="bg-hookr-accent/10 text-hookr-accent border-hookr-accent/20"
                >
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Add a tag" 
                className="bg-hookr-dark text-hookr-light border-hookr-light/20"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button 
                type="button" 
                variant="outline" 
                className="border-hookr-light/20 text-hookr-light"
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="premium-content" 
              checked={isPremium}
              onCheckedChange={setIsPremium}
            />
            <Label htmlFor="premium-content" className="text-hookr-light">
              Premium content (subscribers only)
            </Label>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="bg-hookr-accent text-white"
              disabled={!file || isUploading}
            >
              {isUploading ? (
                <>
                  <span className="animate-spin mr-2">●</span>
                  Uploading...
                </>
              ) : (
                "Upload Post"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostUploader;
