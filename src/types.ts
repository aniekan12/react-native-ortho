export interface CommunityProps {
  color?: string;
  enterprise?: boolean;
  slug: string;
  config: {};
  callback: (e: callbackProps) => void;
}

export type callbackProps = { callback: string; response: { serviceResponse: any; orthoMeta: any } }
