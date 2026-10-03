
CREATE TABLE public.complaint_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text,
  device_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_complaint_submissions_ip_created ON public.complaint_submissions (ip_hash, created_at DESC);
CREATE INDEX idx_complaint_submissions_device_created ON public.complaint_submissions (device_hash, created_at DESC);
GRANT ALL ON public.complaint_submissions TO service_role;
ALTER TABLE public.complaint_submissions ENABLE ROW LEVEL SECURITY;
