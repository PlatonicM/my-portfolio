import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def generate_pdf():
    pdf_path = r"c:\Users\mruna\Downloads\my protfliow\client\public\resume.pdf"
    dist_pdf_path = r"c:\Users\mruna\Downloads\my protfliow\client\dist\resume.pdf"
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor('#0F172A')
    accent_color = colors.HexColor('#D97706')
    text_color = colors.HexColor('#1E293B')
    muted_color = colors.HexColor('#475569')
    
    # Custom Paragraph Styles
    title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=TA_CENTER
    )
    
    subtitle_style = ParagraphStyle(
        'HeaderSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=accent_color,
        alignment=TA_CENTER,
        spaceAfter=4
    )
    
    contact_style = ParagraphStyle(
        'HeaderContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=muted_color,
        alignment=TA_CENTER
    )
    
    section_title_style = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=primary_color,
        spaceBefore=8,
        spaceAfter=2
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_color,
        alignment=TA_JUSTIFY
    )
    
    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_color,
        leftIndent=12
    )
    
    item_header_style = ParagraphStyle(
        'ItemHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=primary_color
    )
    
    item_sub_style = ParagraphStyle(
        'ItemSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        textColor=accent_color
    )
    
    elements = []
    
    # Header
    elements.append(Paragraph("MRUNAL CHAUDHARI", title_style))
    elements.append(Paragraph("SOFTWARE ENGINEER | FULL-STACK DEVELOPER", subtitle_style))
    elements.append(Paragraph(
        "Location: Nagpur, MH &nbsp;|&nbsp; Phone: +91 7030087366 &nbsp;|&nbsp; Email: mrunalchaudhari666@gmail.com<br/>"
        "LinkedIn: linkedin.com/in/mrunal-chaudhari03 &nbsp;|&nbsp; GitHub: github.com/PlatonicM",
        contact_style
    ))
    elements.append(Spacer(1, 6))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=accent_color, spaceAfter=8, spaceBefore=0))
    
    # Summary
    elements.append(Paragraph("SUMMARY", section_title_style))
    elements.append(Paragraph(
        "Software developer with 2+ years building reliable, scalable web applications across the stack — from front-ends (React, TypeScript, Next.js, Tailwind CSS) to back-ends (Python, FastAPI, Django REST Framework, Node.js microservices). Proven track record of shipping production features, architecting multi-agent AI systems, RAG document intelligence, and optimizing REST APIs.",
        body_style
    ))
    elements.append(Spacer(1, 6))
    
    # Technical Skills Matrix
    elements.append(Paragraph("TECHNICAL SKILLS", section_title_style))
    skills_data = [
        [Paragraph("<b>Languages:</b>", body_style), Paragraph("Python, TypeScript, JavaScript, SQL", body_style)],
        [Paragraph("<b>Frontend:</b>", body_style), Paragraph("React, Next.js, Tailwind CSS, Vite, ShadCN UI, Framer Motion, TanStack Query", body_style)],
        [Paragraph("<b>Backend:</b>", body_style), Paragraph("FastAPI, Python, Django, Node.js, Express, REST APIs, JWT Auth, RBAC", body_style)],
        [Paragraph("<b>Database:</b>", body_style), Paragraph("PostgreSQL, MongoDB, Redis", body_style)],
        [Paragraph("<b>Tools & Cloud:</b>", body_style), Paragraph("AWS S3, Docker, Celery, Git, GitHub, Postman, Linux", body_style)],
        [Paragraph("<b>AI & Agentic:</b>", body_style), Paragraph("AI/LLM, RAG, Autonomous AI Agents, OCR, Vector DBs, Prompt Engineering, Gemini API", body_style)]
    ]
    t_skills = Table(skills_data, colWidths=[80, 460])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(t_skills)
    elements.append(Spacer(1, 6))
    
    # Experience
    elements.append(Paragraph("PROFESSIONAL EXPERIENCE", section_title_style))
    
    exp_header = Table([
        [Paragraph("<b>Software Engineer</b> — Insightful Mentoring Network Pvt. Ltd.", item_header_style),
         Paragraph("Aug 2024 – Sept 2026 | Remote", ParagraphStyle('R', parent=body_style, alignment=TA_RIGHT))]
    ], colWidths=[380, 160])
    exp_header.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(exp_header)
    
    exp_bullets = [
        "Designed and implemented secure REST APIs supporting EdTech, AI Automation, and SaaS platforms using Python & FastAPI.",
        "Developed modular service-repository architecture integrating PostgreSQL, MongoDB, Redis, AWS S3, and LLM services.",
        "Built reusable backend service components improving maintainability and reducing duplicate implementations across projects.",
        "Designed and optimized PostgreSQL schemas, composite indexes, and queries to reduce endpoint latency.",
        "Integrated AWS S3 for secure document and media storage with pre-signed upload workflows.",
        "Implemented JWT authentication and Role-Based Access Control (RBAC) to enforce fine-grained authorization."
    ]
    for b in exp_bullets:
        elements.append(Paragraph(f"• {b}", bullet_style))
        
    elements.append(Spacer(1, 6))
    
    # Projects (ONLY 2 PROJECTS: Aptora & Agent-X)
    elements.append(Paragraph("FEATURED PROJECTS", section_title_style))
    
    # Project 1: Aptora
    proj1_table = Table([
        [Paragraph("<b>Aptora</b> — AI-Powered Exam Preparation Platform &nbsp;|&nbsp; <a href='https://github.com/Aniket-Athanikar/Aptora'><u>GitHub Repository</u></a>", item_header_style),
         Paragraph("May 2026 – Aug 2026", ParagraphStyle('R1', parent=body_style, alignment=TA_RIGHT))]
    ], colWidths=[410, 130])
    proj1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(proj1_table)
    elements.append(Paragraph("<i>Technologies: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, TanStack Query, FastAPI, RAG, OCR</i>", item_sub_style))
    
    p1_bullets = [
        "Developed responsive frontend workflows for goal management, document library, flashcards, adaptive mock tests, and analytics.",
        "Integrated OCR document ingestion and RAG search pipelines converting textbooks and PDFs into structured study decks.",
        "Implemented strict type-safe schema validation with Zod and optimistic state handling via TanStack Query."
    ]
    for b in p1_bullets:
        elements.append(Paragraph(f"• {b}", bullet_style))
        
    elements.append(Spacer(1, 4))
    
    # Project 2: Agent-X
    proj2_table = Table([
        [Paragraph("<b>Agent-X</b> — Autonomous AI Agent & Multi-Agent Orchestration Framework &nbsp;|&nbsp; <a href='https://github.com/Aniket-Athanikar/Agent-X'><u>GitHub Repository</u></a>", item_header_style),
         Paragraph("2025 – 2026", ParagraphStyle('R2', parent=body_style, alignment=TA_RIGHT))]
    ], colWidths=[410, 130])
    proj2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(proj2_table)
    elements.append(Paragraph("<i>Technologies: Python, FastAPI, React, TypeScript, LangChain, LlamaIndex, Vector DB, Redis, Gemini API, Docker</i>", item_sub_style))
    
    p2_bullets = [
        "Architected a multi-agent AI orchestration platform featuring Directed Acyclic Graph (DAG) agent execution engines.",
        "Built extensible function-calling tool registries, persistent vector memory, and visual control dashboards for step tracing.",
        "Engineered async task execution queues with Redis for high-concurrency background agent invocations and token analytics."
    ]
    for b in p2_bullets:
        elements.append(Paragraph(f"• {b}", bullet_style))
        
    elements.append(Spacer(1, 6))
    
    # Education & Certifications Side-by-Side
    elements.append(Paragraph("EDUCATION & CERTIFICATIONS", section_title_style))
    edu_data = [
        [Paragraph("<b>Bachelor of Computer Application (BCA)</b>", item_header_style), Paragraph("<b>Python Programming Certification</b>", item_header_style)],
        [Paragraph("Prerna College Of Commerce (RTMNU) · Nagpur, MH (2019 – 2022)", body_style), Paragraph("ThinkNEXT Technologies Pvt. Ltd. (Issued Jan 2022)", body_style)]
    ]
    t_edu = Table(edu_data, colWidths=[270, 270])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    elements.append(t_edu)
    
    doc.build(elements)
    print("PDF build successful:", pdf_path)
    
    if os.path.exists(r"c:\Users\mruna\Downloads\my protfliow\client\dist"):
        shutil.copy(pdf_path, dist_pdf_path)
        print("Copied to dist PDF:", dist_pdf_path)

if __name__ == "__main__":
    generate_pdf()
