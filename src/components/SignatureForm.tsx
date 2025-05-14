import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Mail, MapPin, Phone, User, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import LogoUploader from "./LogoUploader";

const SignatureForm = ({ 
  signatureData, 
  setSignatureData, 
  template, 
  setTemplate,
  layout,
  setLayout
}: { 
  signatureData: any, 
  setSignatureData: React.Dispatch<React.SetStateAction<any>>,
  template: string,
  setTemplate: React.Dispatch<React.SetStateAction<string>>,
  layout: string,
  setLayout: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { toast } = useToast();
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSignatureData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (logoUrl: string) => {
    setSignatureData((prev: any) => ({ ...prev, logoUrl }));
  };

  const handleColorChange = (name: string, value: string) => {
    setSignatureData((prev: any) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const LayoutOption = ({ layoutType, title, description, selected }: { layoutType: string, title: string, description: string, selected: boolean }) => (
    <Card 
      className={`cursor-pointer transition-all ${selected ? 'ring-2 ring-brand-purple' : 'hover:shadow-md'}`}
      onClick={() => setLayout(layoutType)}
    >
      <CardContent className="p-4">
        <div className="relative">
          {selected && (
            <div className="absolute -top-2 -right-2 bg-brand-purple text-white rounded-full p-1">
              <Check size={14} />
            </div>
          )}
          <div className="flex items-center justify-center h-32 bg-slate-50 rounded mb-2 overflow-hidden">
            {/* Layout preview visuals */}
            {layoutType === "standard" && (
              <div className="flex items-start w-3/4 p-2 gap-3">
                <div className="w-1/4 h-12 bg-slate-200 rounded"></div>
                <div className="w-3/4">
                  <div className="h-3 w-1/2 bg-slate-300 rounded mb-2"></div>
                  <div className="h-2 w-3/4 bg-slate-200 rounded mb-1"></div>
                  <div className="h-2 w-3/4 bg-slate-200 rounded mb-1"></div>
                  <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                </div>
              </div>
            )}
            {layoutType === "centered" && (
              <div className="flex flex-col items-center w-3/4 p-2">
                <div className="w-1/3 h-8 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-slate-300 rounded mb-2 mx-auto"></div>
                <div className="h-2 w-1/3 bg-slate-200 rounded mb-1 mx-auto"></div>
                <div className="h-2 w-1/2 bg-slate-200 rounded mb-1 mx-auto"></div>
                <div className="h-2 w-1/4 bg-slate-200 rounded mx-auto"></div>
              </div>
            )}
            {layoutType === "compact" && (
              <div className="flex flex-col w-3/4 p-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-slate-200 rounded"></div>
                  <div>
                    <div className="h-2 w-24 bg-slate-300 rounded mb-1"></div>
                    <div className="h-2 w-16 bg-slate-200 rounded"></div>
                  </div>
                </div>
                <div className="h-px w-full bg-slate-200 mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-2 w-12 bg-slate-200 rounded"></div>
                  <div className="h-2 w-12 bg-slate-200 rounded"></div>
                  <div className="h-2 w-12 bg-slate-200 rounded"></div>
                </div>
              </div>
            )}
            {layoutType === "stacked" && (
              <div className="flex flex-col w-3/4 p-2">
                <div className="h-3 w-1/2 bg-slate-300 rounded mb-3 border-l-4 border-slate-400 pl-2"></div>
                <div className="h-2 w-1/3 bg-slate-200 rounded mb-3"></div>
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-8 bg-slate-200 rounded"></div>
                  <div>
                    <div className="h-1 w-20 bg-slate-200 rounded mb-1"></div>
                    <div className="h-1 w-16 bg-slate-200 rounded mb-1"></div>
                    <div className="h-1 w-12 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            )}
            {layoutType === "modern-cards" && (
              <div className="flex flex-col w-3/4 p-2">
                <div className="h-3 w-1/2 bg-slate-300 rounded mb-2"></div>
                <div className="flex flex-wrap gap-1 mt-1">
                  <div className="h-6 w-14 bg-slate-200 rounded-md flex items-center justify-center">
                    <div className="h-2 w-8 bg-slate-300 rounded"></div>
                  </div>
                  <div className="h-6 w-14 bg-slate-200 rounded-md flex items-center justify-center">
                    <div className="h-2 w-8 bg-slate-300 rounded"></div>
                  </div>
                  <div className="h-6 w-14 bg-slate-200 rounded-md flex items-center justify-center">
                    <div className="h-2 w-8 bg-slate-300 rounded"></div>
                  </div>
                </div>
              </div>
            )}
            {layoutType === "icon-list" && (
              <div className="flex flex-col w-3/4 p-2">
                <div className="flex justify-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                </div>
                <div className="h-3 w-1/2 bg-slate-300 rounded mb-2 mx-auto"></div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-slate-300 mr-2"></div>
                    <div className="h-2 w-24 bg-slate-200 rounded"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-slate-300 mr-2"></div>
                    <div className="h-2 w-20 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            )}
            {layoutType === "two-columns" && (
              <div className="flex justify-between w-3/4 p-2">
                <div className="w-[45%]">
                  <div className="h-3 w-full bg-slate-300 rounded mb-2"></div>
                  <div className="h-2 w-3/4 bg-slate-200 rounded mb-1"></div>
                  <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                </div>
                <div className="w-[45%]">
                  <div className="h-3 w-full bg-slate-300 rounded mb-2"></div>
                  <div className="h-2 w-3/4 bg-slate-200 rounded mb-1"></div>
                  <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                </div>
              </div>
            )}
            {layoutType === "bordered" && (
              <div className="flex flex-col items-center w-3/4 p-2 border-2 border-slate-300 rounded-md">
                <div className="w-1/3 h-8 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-slate-300 rounded mb-2"></div>
                <div className="flex gap-3 justify-center">
                  <div className="h-2 w-8 bg-slate-200 rounded"></div>
                  <div className="h-2 w-8 bg-slate-200 rounded"></div>
                  <div className="h-2 w-8 bg-slate-200 rounded"></div>
                </div>
              </div>
            )}
            {layoutType === "minimalist" && (
              <div className="flex items-center w-3/4 p-2">
                <div className="h-12 w-1 bg-slate-400 mr-3"></div>
                <div className="w-full">
                  <div className="h-3 w-1/3 bg-slate-300 rounded mb-2"></div>
                  <div className="h-2 w-2/3 bg-slate-200 rounded mb-1"></div>
                  <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                </div>
              </div>
            )}
            {layoutType === "bubbles" && (
              <div className="flex flex-col items-center w-3/4 p-2">
                <div className="w-12 h-12 bg-slate-200 rounded-full mb-2"></div>
                <div className="h-3 w-1/2 bg-slate-300 rounded mb-2"></div>
                <div className="flex gap-2 mt-1 justify-center">
                  <div className="h-6 w-6 rounded-full bg-slate-200"></div>
                  <div className="h-6 w-6 rounded-full bg-slate-200"></div>
                  <div className="h-6 w-6 rounded-full bg-slate-200"></div>
                </div>
              </div>
            )}
            {layoutType === "banner" && (
              <div className="flex flex-col w-3/4">
                <div className="h-8 bg-slate-300 rounded-t mb-2 flex items-center justify-center">
                  <div className="h-3 w-1/3 bg-white rounded"></div>
                </div>
                <div className="p-2">
                  <div className="h-2 w-full bg-slate-200 rounded mb-1"></div>
                  <div className="h-2 w-4/5 bg-slate-200 rounded mb-1"></div>
                  <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
                </div>
              </div>
            )}
            {layoutType === "gradient" && (
              <div className="flex flex-col w-3/4 bg-gradient-to-r from-slate-200 to-slate-100 p-2 rounded-md">
                <div className="h-3 w-1/2 bg-white rounded mb-2 mx-auto"></div>
                <div className="h-2 w-3/4 bg-white rounded-full opacity-70 mb-1 mx-auto"></div>
                <div className="h-2 w-1/2 bg-white rounded-full opacity-70 mb-1 mx-auto"></div>
                <div className="h-2 w-1/3 bg-white rounded-full opacity-70 mx-auto"></div>
              </div>
            )}
          </div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6 bg-white rounded-md shadow-sm border">
      {/* Step indicator */}
      <div className="flex items-center mb-6">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 1 ? 'bg-brand-purple text-white' : 'bg-gray-200'}`}>
          1
        </div>
        <div className="flex-1 h-1 mx-2 bg-gray-200">
          <div className={`h-full ${currentStep === 2 ? 'bg-brand-purple' : 'bg-gray-200'}`} style={{width: currentStep === 1 ? '0%' : '100%'}}></div>
        </div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === 2 ? 'bg-brand-purple text-white' : 'bg-gray-200'}`}>
          2
        </div>
      </div>
      
      {currentStep === 1 && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Choose Your Layout</h2>
            <p className="text-gray-500">Select a layout that best fits your style.</p>
          </div>
          
          <div className="space-y-6">
            {/* Template selection */}
            <div className="space-y-3">
              <Label htmlFor="template">Template Style</Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Color picker */}
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
            
            {/* Visual layout selection */}
            <div className="space-y-3">
              <Label>Layout Options</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                <LayoutOption 
                  layoutType="standard" 
                  title="Standard" 
                  description="Logo on the left, text on the right"
                  selected={layout === "standard"}
                />
                <LayoutOption 
                  layoutType="centered" 
                  title="Centered" 
                  description="All elements aligned in the center"
                  selected={layout === "centered"}
                />
                <LayoutOption 
                  layoutType="compact" 
                  title="Compact" 
                  description="Space-efficient with inline elements"
                  selected={layout === "compact"}
                />
                <LayoutOption 
                  layoutType="stacked" 
                  title="Stacked" 
                  description="Elements stacked vertically"
                  selected={layout === "stacked"}
                />
                <LayoutOption 
                  layoutType="modern-cards" 
                  title="Modern Cards" 
                  description="Contact info in modern card style"
                  selected={layout === "modern-cards"}
                />
                <LayoutOption 
                  layoutType="icon-list" 
                  title="Icon List" 
                  description="Contact details with icons"
                  selected={layout === "icon-list"}
                />
                <LayoutOption 
                  layoutType="two-columns" 
                  title="Two Columns" 
                  description="Information split into two columns"
                  selected={layout === "two-columns"}
                />
                <LayoutOption 
                  layoutType="bordered" 
                  title="Bordered" 
                  description="Clean design with an elegant border"
                  selected={layout === "bordered"}
                />
                <LayoutOption 
                  layoutType="minimalist" 
                  title="Minimalist" 
                  description="Simple design with minimal elements"
                  selected={layout === "minimalist"}
                />
                <LayoutOption 
                  layoutType="bubbles" 
                  title="Bubbles" 
                  description="Round elements for a playful look"
                  selected={layout === "bubbles"}
                />
                <LayoutOption 
                  layoutType="banner" 
                  title="Banner" 
                  description="Top banner with important information"
                  selected={layout === "banner"}
                />
                <LayoutOption 
                  layoutType="gradient" 
                  title="Gradient" 
                  description="Subtle gradient background effect"
                  selected={layout === "gradient"}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={nextStep} className="bg-brand-purple hover:bg-opacity-90">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}
      
      {currentStep === 2 && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Enter Your Information</h2>
            <p className="text-gray-500">Add your personal and company details to complete your signature.</p>
          </div>
          
          <div className="space-y-6">
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
                  <Input
                    id="website"
                    name="website"
                    value={signatureData.website}
                    onChange={handleInputChange}
                    placeholder="https://www.example.com"
                  />
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
                Company Logo
              </h3>
              <LogoUploader logoUrl={signatureData.logoUrl} onLogoChange={handleLogoChange} />
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button onClick={prevStep} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button 
              onClick={() => {
                toast({
                  title: "Information saved!",
                  description: "Your signature information has been updated.",
                });
              }} 
              className="bg-brand-purple hover:bg-opacity-90"
            >
              Save Information
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignatureForm;
