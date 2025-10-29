import * as React from 'react'
import { ReferenceUploadData } from '@/types/request';

export type UploadModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  allowSkip?: boolean;
  skipHandler?: () => void;
  showBackdrop?: boolean;
}