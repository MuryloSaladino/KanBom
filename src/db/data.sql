--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.members (
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    "userId" uuid NOT NULL,
    "teamId" uuid NOT NULL
);


ALTER TABLE public.members OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    content text NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participants (
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    role character varying(20) NOT NULL,
    "userId" uuid NOT NULL,
    "projectId" uuid NOT NULL
);


ALTER TABLE public.participants OWNER TO postgres;

--
-- Name: project_invites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_invites (
    role character varying(20) NOT NULL,
    "userId" uuid NOT NULL,
    "projectId" uuid NOT NULL
);


ALTER TABLE public.project_invites OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    name character varying(50) NOT NULL,
    thumbnail character varying(255)
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: team_invites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.team_invites (
    "userId" uuid NOT NULL,
    "teamId" uuid NOT NULL
);


ALTER TABLE public.team_invites OWNER TO postgres;

--
-- Name: teams; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teams (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    name character varying(50) NOT NULL,
    "ownerId" uuid NOT NULL
);


ALTER TABLE public.teams OWNER TO postgres;

--
-- Name: user_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_details (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    birthdate date NOT NULL,
    "firstName" character varying(50) NOT NULL,
    "lastName" character varying(150) NOT NULL,
    "profilePicture" character varying(1024)
);


ALTER TABLE public.user_details OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone,
    email character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    "detailsId" uuid NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.members ("createdAt", "updatedAt", "deletedAt", "userId", "teamId") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1728043249568	Migration1728043249568
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, "createdAt", "updatedAt", "deletedAt", content, "userId") FROM stdin;
\.


--
-- Data for Name: participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.participants ("createdAt", "updatedAt", "deletedAt", role, "userId", "projectId") FROM stdin;
\.


--
-- Data for Name: project_invites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_invites (role, "userId", "projectId") FROM stdin;
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, "createdAt", "updatedAt", "deletedAt", name, thumbnail) FROM stdin;
\.


--
-- Data for Name: team_invites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.team_invites ("userId", "teamId") FROM stdin;
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teams (id, "createdAt", "updatedAt", "deletedAt", name, "ownerId") FROM stdin;
\.


--
-- Data for Name: user_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_details (id, "createdAt", "updatedAt", "deletedAt", birthdate, "firstName", "lastName", "profilePicture") FROM stdin;
32004ad6-c9a8-40a9-99e1-a2045563ab99	2024-10-08 11:04:00.125885	2024-10-08 11:04:00.125885	\N	2002-11-08	User	Two	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "createdAt", "updatedAt", "deletedAt", email, password, "detailsId") FROM stdin;
cf1172a0-4ca6-476c-bda0-0aa6cb767947	2024-10-08 11:04:00.125885	2024-10-08 11:04:00.125885	\N	user2@mail.com	$2a$10$/S/cNy9R5YIP6E.EP4/YCuzFnasnewzxOuMtIjYAefKFUz4GQHnjC	32004ad6-c9a8-40a9-99e1-a2045563ab99
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- Name: project_invites PK_3a2acddd4aa0e0b377f13b7dd08; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_invites
    ADD CONSTRAINT "PK_3a2acddd4aa0e0b377f13b7dd08" PRIMARY KEY ("userId", "projectId");


--
-- Name: members PK_43a4d6740a5ee8f08007ee43154; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT "PK_43a4d6740a5ee8f08007ee43154" PRIMARY KEY ("userId", "teamId");


--
-- Name: team_invites PK_59f7224fdb9384ecc177fe9d821; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_invites
    ADD CONSTRAINT "PK_59f7224fdb9384ecc177fe9d821" PRIMARY KEY ("userId", "teamId");


--
-- Name: projects PK_6271df0a7aed1d6c0691ce6ac50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY (id);


--
-- Name: notifications PK_6a72c3c0f683f6462415e653c3a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY (id);


--
-- Name: teams PK_7e5523774a38b08a6236d322403; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: participants PK_c74383adf80965aba7b3b8820a2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT "PK_c74383adf80965aba7b3b8820a2" PRIMARY KEY ("userId", "projectId");


--
-- Name: user_details PK_fb08394d3f499b9e441cab9ca51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY (id);


--
-- Name: users REL_a8687924ae4d52f05db87f3352; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "REL_a8687924ae4d52f05db87f3352" UNIQUE ("detailsId");


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: team_invites FK_0fafbd500678c042168d10b1bea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_invites
    ADD CONSTRAINT "FK_0fafbd500678c042168d10b1bea" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: project_invites FK_3980d35d74a13538c946e3c1901; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_invites
    ADD CONSTRAINT "FK_3980d35d74a13538c946e3c1901" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: project_invites FK_588e2eea31dbb36b3c4d3783d3f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_invites
    ADD CONSTRAINT "FK_588e2eea31dbb36b3c4d3783d3f" FOREIGN KEY ("projectId") REFERENCES public.projects(id);


--
-- Name: participants FK_5fc9cddc801b973cd9edcdda42a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: notifications FK_692a909ee0fa9383e7859f9b406; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: team_invites FK_79cc18d8efe27b7d57df31c187a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.team_invites
    ADD CONSTRAINT "FK_79cc18d8efe27b7d57df31c187a" FOREIGN KEY ("teamId") REFERENCES public.teams(id);


--
-- Name: members FK_839756572a2c38eb5a3b563126e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT "FK_839756572a2c38eb5a3b563126e" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: participants FK_930a407b85c1dfb573df6f76335; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT "FK_930a407b85c1dfb573df6f76335" FOREIGN KEY ("projectId") REFERENCES public.projects(id);


--
-- Name: users FK_a8687924ae4d52f05db87f3352f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_a8687924ae4d52f05db87f3352f" FOREIGN KEY ("detailsId") REFERENCES public.user_details(id);


--
-- Name: members FK_b0fe0d62c4fd4633321fdf9616f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT "FK_b0fe0d62c4fd4633321fdf9616f" FOREIGN KEY ("teamId") REFERENCES public.teams(id);


--
-- Name: teams FK_b5ebe13256317503931ecabb556; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT "FK_b5ebe13256317503931ecabb556" FOREIGN KEY ("ownerId") REFERENCES public.users(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

