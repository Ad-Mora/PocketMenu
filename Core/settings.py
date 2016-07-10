"""
Django settings for PocketMenu project.

Generated by 'django-admin startproject' using Django 1.9.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os
import dj_database_url


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'PhotoMenu.apps.PhotomenuConfig',
    'compressor',
    'storages',
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

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.RemoteUserBackend',
    'django.contrib.auth.backends.ModelBackend',
)

STATICFILES_FINDERS = {
    'compressor.finders.CompressorFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
}


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases
DATABASES = {
    'default': dj_database_url.config(),
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
TIME_ZONE = ''
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Media and Static files storage on AWS
AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']

# Tell django-storages that when coming up with the URL for an item in S3 storage, keep
# it simple - just use this domain plus the path. (If this isn't set, things get complicated).
# This controls how the `static` template tag from `staticfiles` gets expanded, if you're using it.
# We also use it in the next setting.
AWS_S3_CUSTOM_URL = 'https://%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME

# Static root
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles/')
STATIC_URL = '/static/'

# Media root
MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'media/')
MEDIA_URL = '/media/'

# Email config
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'chompsmail@gmail.com'
EMAIL_HOST_PASSWORD = os.environ['MAIL_PASSWORD']
EMAIL_PORT = 587
EMAIL1 = os.environ['EMAIL1']
EMAIL2 = os.environ['EMAIL2']

# Tell the staticfiles app to use use default storage when writing collected static files (when
# you run 'collectstatic'
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
COMPRESS_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

# Other config
DEBUG = os.environ['DEBUG'] == 'True'
USE_S3_MEDIA = os.environ['USE_S3_MEDIA'] == 'True'
# PREPEND_WWW = os.environ['PREPEND_WWW'] == 'True'
ALLOWED_HOSTS = ['18.189.105.8', 'localhost', 'www.chomps.io', 'chomps.io', 'chompsio.herokuapp.com']
SECURE_HSTS_SECONDS = int(os.environ['SECURE_HSTS_SECONDS'])
SECURE_CONTENT_TYPE_NOSNIFF = os.environ['SECURE_CONTENT_TYPE_NOSNIFF'] == 'True'
SECURE_BROWSER_XSS_FILTER = os.environ['SECURE_BROWSER_XSS_FILTER'] == 'True'
SECURE_SSL_REDIRECT = os.environ['SECURE_SSL_REDIRECT'] == 'True'
X_FRAME_OPTIONS = os.environ['X_FRAME_OPTIONS']
CONN_MAX_AGE = int(os.environ['CONN_MAX_AGE'])
SECRET_KEY = os.environ['SECRET_KEY']

if not DEBUG or (USE_S3_MEDIA and DEBUG):
    STATIC_URL = AWS_S3_CUSTOM_URL + '/staticfiles/'
    MEDIA_URL = AWS_S3_CUSTOM_URL + '/media/'

    # Tell the staticfiles app to use S3Boto storage when writing the collected static files (when
    # you run `collectstatic`).
    DEFAULT_FILE_STORAGE = 'Core.s3utils.MediaRootS3BotoStorage'
    STATICFILES_STORAGE = 'Core.s3utils.StaticfilesRootS3BotoStorage'
    COMPRESS_STORAGE = 'storages.backends.s3boto.S3BotoStorage'