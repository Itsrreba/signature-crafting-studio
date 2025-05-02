import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Image, Link, Mail, MapPin, Phone, User } from "lucide-react";

const SignatureForm = ({ 
  signatureData, 
  setSignatureData, 
  template, 
  setTemplate 
}: { 
  signatureData: any, 
  setSignatureData: React.Dispatch<React.SetStateAction<any>>,
  template: string,
  setTemplate: React.Dispatch<React.SetStateAction<string>>
}) => {
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSignatureData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (name: string, value: string) => {
    setSignatureData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-sm border">
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <User className="h-4 w-4" /> Personal Information
        </h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={signatureData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={signatureData.jobTitle}
                onChange={handleInputChange}
                placeholder="Marketing Manager"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={signatureData.companyName}
              onChange={handleInputChange}
              placeholder="Acme Inc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <Input
                id="email"
                name="email"
                value={signatureData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
                type="email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <Input
                id="phone"
                name="phone"
                value={signatureData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="flex items-center gap-2">
              <Link className="h-4 w-4 text-gray-500" />
              <Input
                id="website"
                name="website"
                value={signatureData.website}
                onChange={handleInputChange}
                placeholder="https://www.example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <Input
                id="address"
                name="address"
                value={signatureData.address}
                onChange={handleInputChange}
                placeholder="123 Business St, City, Country"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Image className="h-4 w-4" /> Company Logo
        </h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input
              id="logoUrl"
              name="logoUrl"
              value={signatureData.logoUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Palette className="h-4 w-4" /> Styling Options
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="primaryColor"
                name="primaryColor"
                value={signatureData.primaryColor}
                onChange={handleInputChange}
                placeholder="#9b87f5"
              />
              <input
                type="color"
                value={signatureData.primaryColor}
                onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                className="w-10 h-10 border p-1 rounded"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="template">Template Style</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureForm;
