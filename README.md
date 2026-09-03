# WebOps Pty Ltd — Website & CMS

A modern, responsive website and custom content management system (CMS) for **WebOps Pty Ltd**, an Australian IT and digital services company.

The project includes a public marketing website and a secure admin CMS for managing services, portfolio projects, website content, media, and contact enquiries.

## Live Website

**Production:** https://web-ops-pty-ltd.vercel.app/

---

## Overview

The website was redesigned and developed from scratch to provide:

- A modern and responsive user experience
- Clear presentation of WebOps Pty Ltd's services
- Dynamic portfolio and project pages
- Secure administrator access
- Database-backed content management
- Cloud-based image and media management
- Contact enquiry management
- SEO-friendly page structure
- High performance and accessibility

The application is built as a **full-stack Next.js application**, meaning the frontend and backend functionality are handled within the same Next.js project.

---

## Features

### Public Website

- Home page
- About page
- Services listing
- Individual service pages
- Portfolio listing
- Individual portfolio project pages
- Contact page
- Responsive design for mobile, tablet, and desktop
- Accessible navigation and UI
- SEO-friendly URLs and metadata
- Sitemap and robots.txt

### Admin CMS

The `/admin` area provides authenticated content management functionality.

Administrators can:

- Sign in securely
- Manage website About content
- Manage company values
- Create, edit, and delete services
- Upload service images
- Create, edit, and delete portfolio projects
- Assign services to portfolio projects
- Upload portfolio thumbnails
- Upload and reorder portfolio gallery images
- Mark projects as featured
- Publish/unpublish projects
- Control display ordering
- View and manage contact enquiries

### Media Management

Images are managed through Cloudinary.

The CMS supports:

- Image uploads
- Thumbnail management
- Portfolio galleries
- Image reordering
- Image previews
- Supported image formats including JPEG, PNG, WebP, and AVIF

The database stores media metadata and Cloudinary references, while the actual image files are stored in Cloudinary.

---

## Technology Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui

### Backend

- Next.js App Router
- Server Components
- Server Actions
- Route Handlers
- Custom server-side authentication

### Database

- PostgreSQL
- Neon PostgreSQL
- Drizzle ORM

### Media Storage

- Cloudinary

### Deployment

- Vercel
- GitHub
- Neon
- Cloudinary

---

## System Architecture

The application uses a single Next.js application for both frontend and backend functionality.

```text
                         ┌──────────────────┐
                         │      GitHub      │
                         │   Source Code    │
                         └────────┬─────────┘
                                  │
                              Deployment
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │          Vercel          │
                    │                          │
                    │    Next.js Application   │
                    │                          │
                    │  ┌────────────────────┐  │
                    │  │     Frontend       │  │
                    │  │ React / Next.js    │  │
                    │  └─────────┬──────────┘  │
                    │            │             │
                    │  ┌─────────▼──────────┐  │
                    │  │      Backend       │  │
                    │  │ Server Components  │  │
                    │  │ Server Actions     │  │
                    │  │ Route Handlers     │  │
                    │  └─────────┬──────────┘  │
                    └────────────┼─────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
          ┌─────────────────┐       ┌─────────────────┐
          │      Neon       │       │   Cloudinary    │
          │   PostgreSQL    │       │  Image Storage  │
          │                 │       │                 │
          │ Structured Data │       │  Actual Images  │
          └─────────────────┘       └─────────────────┘