// types.d.ts
interface Window {
  electronStore: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
  };
  electron: {
    openFileDialog: () => Promise<string | null>;
  };
}