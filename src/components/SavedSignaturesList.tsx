
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { MoreHorizontal, Download, Edit, Trash2 } from "lucide-react";
import { generateSignatureHTML } from "@/utils/signatureHtml";

const SavedSignaturesList: React.FC = () => {
  const { user, savedSignatures, deleteSignature, updateSignature, isSavingSignature, refreshSignatures } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSignature, setEditingSignature] = useState<any>(null);
  const [signatureName, setSignatureName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // If there's no user or if we have no signatures, don't show this component
  if (!user || savedSignatures.length === 0) {
    return null;
  }

  const handleEditClick = (signature: any) => {
    setEditingSignature(signature);
    setSignatureName(signature.name);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleEditConfirm = async () => {
    if (editingSignature && signatureName.trim()) {
      await updateSignature(
        editingSignature.id,
        signatureName,
        editingSignature.signature_data,
        editingSignature.layout
      );
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingId) {
      await deleteSignature(deletingId);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleDownload = (signature: any) => {
    const html = generateSignatureHTML(signature.signature_data, signature.layout);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `signature-${signature.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Saved Signatures</h2>
        <Button variant="outline" size="sm" onClick={() => refreshSignatures()}>
          Refresh
        </Button>
      </div>

      {savedSignatures.map((signature: any) => (
        <Card key={signature.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{signature.name}</CardTitle>
                <CardDescription>
                  {formatDate(signature.created_at)}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEditClick(signature)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload(signature)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => handleDeleteClick(signature.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-4 rounded border overflow-hidden max-h-32">
              <iframe
                srcDoc={generateSignatureHTML(signature.signature_data, signature.layout)}
                title={signature.name}
                className="w-full h-24 pointer-events-none"
                frameBorder="0"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDownload(signature)}
            >
              <Download className="mr-2 h-4 w-4" /> Download HTML
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename Signature</DialogTitle>
            <DialogDescription>
              Update the name of your saved signature.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="signature-name" className="text-right">
                Name
              </Label>
              <Input
                id="signature-name"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                className="col-span-3"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEditConfirm}
              disabled={isSavingSignature || !signatureName.trim()}
            >
              {isSavingSignature ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Signature</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this signature? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavedSignaturesList;
