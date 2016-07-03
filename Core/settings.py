"""
Django settings for PocketMenu project.

Generated by 'django-admin startproject' using Django 1.9.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os
# from secret_settings import *


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(CURRENT_DIR)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# Secret key here


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'PhotoMenu.apps.PhotomenuConfig',
]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media'
            ],
        },
    },
]

WSGI_APPLICATION = 'Core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['DATABASE_NAME'],
        'USER': os.environ['DATABASE_USER'],
        'PASSWORD': os.environ['PASSWORD'],
        'HOST': os.environ['HOST'],
        'PORT': os.environ['PORT'],
    }
}


# Password validationf
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Media root
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
MEDIA_URL = '/media/'


######################################################
# Settings I changed because Django told me to :(    #
######################################################
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ['DEBUG'] == 'True' #False
ALLOWED_HOSTS = ['chomps.io', 'chompsio.herokuapp.com']
SECURE_HSTS_SECONDS = int(os.environ['SECURE_HSTS_SECONDS']) #0
SECURE_CONTENT_TYPE_NOSNIFF = os.environ['SECURE_CONTENT_TYPE_NOSNIFF'] == 'True' #True
SECURE_BROWSER_XSS_FILTER = os.environ['SECURE_BROWSER_XSS_FILTER'] == 'True' #True
SECURE_SSL_REDIRECT = os.environ['SECURE_SSL_REDIRECT'] == 'True'#False
SESSION_COOKIE_SECURE = os.environ['SESSION_COOKIE_SECURE'] == 'True'#True
CSRF_COOKIE_SECURE = os.environ['CSRF_COOKIE_SECURE'] == 'True'#True
CSRF_COOKIE_HTTPONLY = os.environ['CSRF_COOKIE_HTTPONLY'] == 'True'#False    # ----> Ideally we'd set this to true but that means we need to put a csrfInputToken
                                # on every page we use Ajax. This isn't difficult we just haven't done it yet
X_FRAME_OPTIONS = os.environ['X_FRAME_OPTIONS'] #'DENY'
CONN_MAX_AGE = int(os.environ['CONN_MAX_AGE']) #0

SECRET_KEY = os.environ['SECRET_KEY']

































