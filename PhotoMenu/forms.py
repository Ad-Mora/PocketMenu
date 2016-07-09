from django import forms


class ContactUsForm(forms.Form):
    name = forms.CharField(required=False, max_length=100, widget=forms.TextInput(attrs={'class': 'text-input-field'}))
    email = forms.EmailField(required=False, max_length=100, widget=forms.TextInput(attrs={'class': 'text-input-field'}))
    message = forms.CharField(max_length=2000, widget=forms.Textarea(attrs={'class': 'message-area'}))

